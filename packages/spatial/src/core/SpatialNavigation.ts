import {
    exclude,
    getCurrentFocusedElement,
    matchSelector,
    parseSelector,
    navigate,
    isHTMLElement,
    isNavKey,
} from './utils';
import type { Config, Section, Direction, ExtendedSelector, NavigationKeyCodes, SectionName } from './types';

interface SpatialNavigationGlobalConfig {
    config?: Config;
    eventPrefix?: string;
    idPoolPrefix?: string;
}

const KEY_MAPPING: Record<NavigationKeyCodes, Direction> = {
    ArrowLeft: 'left',
    ArrowUp: 'up',
    ArrowRight: 'right',
    ArrowDown: 'down',
} as const;

const REVERSE: Record<Direction, Direction> = {
    left: 'right',
    up: 'down',
    right: 'left',
    down: 'up',
    none: 'none',
} as const;

export class SpatialNavigation {
    private constructor() {
        // приватный конструктор для реализации паттерна singleton
    }

    private static instance: SpatialNavigation | null = null;

    static getInstance(): SpatialNavigation {
        if (this.instance !== null) {
            return this.instance;
        }

        this.instance = new SpatialNavigation();

        return this.instance;
    }

    private readonly globalConfig: Config = {
        selector: '',
        straightOnly: false,
        straightOverlapThreshold: 0.5,
        rememberSource: false,
        disabled: false,
        defaultElement: '',
        enterTo: 'calculated',
        leaveFor: null,
        restrict: 'self-first',
        tabIndexIgnoreList: 'a, input, select, textarea, button, iframe, [contentEditable=true]',
        navigableFilter: null,
    };

    private EVENT_PREFIX = 'sn:';

    private ID_POOL_PREFIX = 'section-';

    private idPool = 0;

    private ready = false;

    private pause = false;

    private sections: Map<string, Section> = new Map();

    private defaultSectionId = '';

    private lastSectionId = '';

    private duringFocusChange = false;

    /** ***************** */
    /* Private Function */
    /** ***************** */
    private generateId(): string {
        let id;
        for (;;) {
            this.idPool += 1;
            id = this.ID_POOL_PREFIX + String(this.idPool);
            if (!this.sections.has(id)) {
                break;
            }
        }
        return id;
    }

    private isNavigable(element: HTMLElement, sectionId?: string, verifySectionSelector?: boolean): boolean {
        if (!element || !sectionId) {
            return false;
        }

        const section = this.sections.get(sectionId);

        if (!section || section.config.disabled) {
            return false;
        }

        // element has 0 by 0 size or has disabled attribute
        if (
            isHTMLElement(element) &&
            ((element.offsetWidth <= 0 && element.offsetHeight <= 0) || element.hasAttribute('disabled'))
        ) {
            return false;
        }

        if (isHTMLElement(element) && verifySectionSelector && !matchSelector(element, section.config.selector)) {
            return false;
        }
        if (typeof section.config.navigableFilter === 'function') {
            if (section.config.navigableFilter(element, sectionId) === false) {
                return false;
            }
        } else if (typeof this.globalConfig.navigableFilter === 'function') {
            if (this.globalConfig.navigableFilter(element, sectionId) === false) {
                return false;
            }
        }

        return true;
    }

    private getSectionId(element: HTMLElement): string | undefined {
        for (const [id, section] of this.sections) {
            if (!section.config.disabled && matchSelector(element, section.config.selector)) {
                return id;
            }
        }

        return undefined;
    }

    private getSectionNavigableElements(sectionId: string): HTMLElement[] {
        const selector = this.sections.get(sectionId)?.config.selector;

        const navigableElements: HTMLElement[] = [];

        if (typeof selector === 'undefined') {
            return navigableElements;
        }

        for (const element of parseSelector(selector)) {
            if (this.isNavigable(element, sectionId, false)) {
                navigableElements.push(element);
            }
        }

        return navigableElements;
    }

    private getSectionDefaultElement(sectionId: string): HTMLElement | null {
        let element: HTMLElement | undefined;
        const defaultElement = this.sections.get(sectionId)?.config.defaultElement;

        if (!defaultElement) {
            return null;
        }

        if (typeof defaultElement === 'string') {
            [element] = parseSelector(defaultElement);
        }

        if (defaultElement instanceof HTMLElement) {
            element = defaultElement;
        }

        if (defaultElement instanceof NodeList) {
            const node = defaultElement.item(0);
            element = isHTMLElement(node) ? node : undefined;
        }

        if (Array.isArray(defaultElement)) {
            [element] = defaultElement;
        }

        if (element instanceof HTMLElement && this.isNavigable(element, sectionId, true)) {
            return element;
        }

        return null;
    }

    private getSectionLastFocusedElement(sectionId: string): HTMLElement | null {
        const lastFocusedElement = this.sections.get(sectionId)?.lastFocusedElement;
        if (lastFocusedElement instanceof HTMLElement) {
            if (this.isNavigable(lastFocusedElement, sectionId, true)) {
                return lastFocusedElement;
            }
        }
        return null;
    }

    private fireEvent(element: HTMLElement, type: string, detail?: unknown, cancelable = true): boolean {
        const event = new CustomEvent(this.EVENT_PREFIX + type, { bubbles: true, cancelable, detail });
        return element.dispatchEvent(event);
    }

    private focusChanged(element: HTMLElement, sectionId?: string): void {
        let id = sectionId;
        if (!sectionId) {
            id = this.getSectionId(element);
        }

        if (id) {
            const section = this.sections.get(id);

            if (section) {
                section.lastFocusedElement = element;
                this.lastSectionId = id;
            }
        }
    }

    private focusElement(element: HTMLElement, sectionId?: string, direction?: string): boolean {
        if (!element) {
            return false;
        }

        const currentFocusedElement = getCurrentFocusedElement();

        const silentFocus = (): void => {
            if (currentFocusedElement) {
                currentFocusedElement.blur();
            }
            element.focus({ preventScroll: true });
            this.focusChanged(element, sectionId);
        };

        if (this.duringFocusChange) {
            silentFocus();
            return true;
        }

        this.duringFocusChange = true;

        if (this.pause) {
            silentFocus();
            this.duringFocusChange = false;
            return true;
        }

        if (currentFocusedElement) {
            const unfocusProperties = {
                nextElement: element,
                nextSectionId: sectionId,
                direction,
                native: false,
            };
            if (!this.fireEvent(currentFocusedElement, 'willunfocus', unfocusProperties)) {
                this.duringFocusChange = false;
                return false;
            }
            currentFocusedElement.blur();
            this.fireEvent(currentFocusedElement, 'unfocused', unfocusProperties, false);
        }

        const focusProperties = {
            previousElement: currentFocusedElement,
            sectionId,
            direction,
            native: false,
        };
        if (!this.fireEvent(element, 'willfocus', focusProperties)) {
            this.duringFocusChange = false;
            return false;
        }
        element.focus({ preventScroll: true });
        this.fireEvent(element, 'focused', focusProperties, false);

        this.duringFocusChange = false;

        this.focusChanged(element, sectionId);
        return true;
    }

    private readonly range: Set<string> = new Set();

    private addRange(sectionId: string): void {
        const section = this.sections.get(sectionId);

        if (!section) {
            return;
        }

        if (sectionId && !section.config.disabled) {
            this.range.add(sectionId);
        }
    }

    private fillRangesFromSections = (_section: Section, sectionId: string): void => {
        this.addRange(sectionId);
    };

    private focusSection(sectionId?: string): boolean {
        this.range.clear();

        if (sectionId) {
            this.addRange(sectionId);
        } else {
            this.addRange(this.defaultSectionId);
            this.addRange(this.lastSectionId);
            this.sections.forEach(this.fillRangesFromSections);
        }

        for (const id of this.range) {
            let next;

            const enterTo = this.sections.get(id)?.config.enterTo;

            if (enterTo === 'last-focused') {
                next =
                    this.getSectionLastFocusedElement(id) ||
                    this.getSectionDefaultElement(id) ||
                    this.getSectionNavigableElements(id)[0];
            } else {
                next =
                    this.getSectionDefaultElement(id) ||
                    this.getSectionLastFocusedElement(id) ||
                    this.getSectionNavigableElements(id)[0];
            }

            if (next) {
                return this.focusElement(next, id);
            }
        }

        return false;
    }

    private focusExtendedSelector(selector: ExtendedSelector, direction?: string): boolean {
        if (typeof selector === 'string') {
            if (selector.startsWith('@')) {
                if (selector === '@') {
                    return this.focusSection();
                }
                const sectionId = selector.substr(1);
                return this.focusSection(sectionId);
            }
        }
        const [next] = parseSelector(selector);
        if (next) {
            const nextSectionId = this.getSectionId(next);
            if (this.isNavigable(next, nextSectionId)) {
                return this.focusElement(next, nextSectionId, direction);
            }
        }

        return false;
    }

    private fireNavigatefailed(element: HTMLElement, direction: Direction): void {
        this.fireEvent(
            element,
            'navigatefailed',
            {
                direction,
            },
            false,
        );
    }

    private gotoLeaveFor(sectionId: string, direction: Direction): boolean | null {
        const leaveForObject = this.sections.get(sectionId)?.config.leaveFor;

        if (leaveForObject) {
            let next: string | HTMLElement | NodeList | HTMLElement[] | undefined | void;

            const leaveFor = leaveForObject[direction];
            if (typeof leaveFor === 'function') {
                next = leaveFor();
            } else {
                next = leaveFor;
            }
            if (next === '') {
                return null;
            }
            if (typeof next === 'undefined') {
                return false;
            }
            return this.focusExtendedSelector(next, direction);
        }
        return false;
    }

    private focusNext(direction: Direction, currentFocusedElement: HTMLElement, currentSectionId: string): boolean {
        const selector = currentFocusedElement.getAttribute(`data-sn-${direction}`);
        if (typeof selector === 'string') {
            if (selector === '' || !this.focusExtendedSelector(selector, direction)) {
                this.fireNavigatefailed(currentFocusedElement, direction);
                return false;
            }
            return true;
        }

        const sectionNavigableElements: Record<string, HTMLElement[]> = {};

        let allNavigableElements: HTMLElement[] = [];

        for (const [id] of this.sections) {
            sectionNavigableElements[id] = this.getSectionNavigableElements(id);
            allNavigableElements = allNavigableElements.concat(sectionNavigableElements[id]);
        }

        const config = { ...this.globalConfig, ...this.sections.get(currentSectionId)?.config };

        let next: HTMLElement | null;

        if (config.restrict === 'self-only' || config.restrict === 'self-first') {
            const currentSectionNavigableElements = sectionNavigableElements[currentSectionId];

            next = navigate(
                currentFocusedElement,
                direction,
                exclude(currentSectionNavigableElements, currentFocusedElement),
                config,
            );

            if (!next && config.restrict === 'self-first') {
                next = navigate(
                    currentFocusedElement,
                    direction,
                    exclude(allNavigableElements, currentSectionNavigableElements),
                    config,
                );
            }
        } else {
            next = navigate(
                currentFocusedElement,
                direction,
                exclude(allNavigableElements, currentFocusedElement),
                config,
            );
        }

        if (next) {
            const section = this.sections.get(currentSectionId);

            if (section?.config) {
                section.config.previous = {
                    target: currentFocusedElement,
                    destination: next,
                    reverse: REVERSE[direction],
                };
            }

            const nextSectionId = this.getSectionId(next);

            if (currentSectionId !== nextSectionId) {
                const result = this.gotoLeaveFor(currentSectionId, direction);
                if (result) {
                    return true;
                }
                if (result === null) {
                    this.fireNavigatefailed(currentFocusedElement, direction);
                    return false;
                }

                let enterToElement;

                if (typeof nextSectionId === 'string') {
                    const enterTo = this.sections.get(nextSectionId)?.config.enterTo;

                    switch (enterTo) {
                        case 'last-focused':
                            enterToElement =
                                this.getSectionLastFocusedElement(nextSectionId) ||
                                this.getSectionDefaultElement(nextSectionId);
                            break;
                        case 'default-element':
                            enterToElement = this.getSectionDefaultElement(nextSectionId);
                            break;
                        default:
                            break;
                    }
                }
                if (enterToElement) {
                    next = enterToElement;
                }
            }

            return this.focusElement(next, nextSectionId, direction);
        }
        if (this.gotoLeaveFor(currentSectionId, direction)) {
            return true;
        }

        this.fireNavigatefailed(currentFocusedElement, direction);
        return false;
    }

    private preventDefault(event: Event): boolean {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    private throttleKeyDown = false;

    private setThrottleKeyDown = (): void => {
        this.throttleKeyDown = false;
    };

    private onKeyDown(event: KeyboardEvent): boolean {
        if (this.throttleKeyDown) {
            return this.preventDefault(event);
        }

        window.requestAnimationFrame(this.setThrottleKeyDown);

        this.throttleKeyDown = true;

        if (!this.sections.size || this.pause || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return false;
        }

        let currentFocusedElement: HTMLElement | null;

        const code = event.code || event.key;

        const direction = isNavKey(code) ? KEY_MAPPING[code] : undefined;

        if (!direction) {
            if (code === 'Enter' || code === 'Escape') {
                currentFocusedElement = getCurrentFocusedElement();
                if (currentFocusedElement && this.getSectionId(currentFocusedElement)) {
                    if (!this.fireEvent(currentFocusedElement, code === 'Enter' ? 'enter-down' : 'escape-down')) {
                        return this.preventDefault(event);
                    }
                }
            }
            return false;
        }

        currentFocusedElement = getCurrentFocusedElement();

        if (!currentFocusedElement) {
            if (this.lastSectionId) {
                currentFocusedElement = this.getSectionLastFocusedElement(this.lastSectionId);
            }
            if (!currentFocusedElement) {
                this.focusSection();
                return this.preventDefault(event);
            }
        }

        const currentSectionId = this.getSectionId(currentFocusedElement);
        if (!currentSectionId) {
            return false;
        }

        const willmoveProperties = {
            direction,
            sectionId: currentSectionId,
            cause: 'keydown',
        };

        if (this.fireEvent(currentFocusedElement, 'willmove', willmoveProperties)) {
            this.focusNext(direction, currentFocusedElement, currentSectionId);
        }

        return this.preventDefault(event);
    }

    private onKeyUp(event: KeyboardEvent): undefined {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return undefined;
        }

        const code = event.code || event.key;

        if (!this.pause && this.sections.size && (code === 'Enter' || code === 'Escape')) {
            const currentFocusedElement = getCurrentFocusedElement();
            if (currentFocusedElement && this.getSectionId(currentFocusedElement)) {
                if (!this.fireEvent(currentFocusedElement, code === 'Enter' ? 'enter-up' : 'escape-up')) {
                    event.preventDefault();
                }
            }
        }
        return undefined;
    }

    private onFocus(event: FocusEvent): void {
        const { target } = event;
        if (isHTMLElement(target) && this.sections.size && !this.duringFocusChange) {
            const sectionId = this.getSectionId(target);
            if (sectionId) {
                if (this.pause) {
                    this.focusChanged(target, sectionId);
                    return;
                }

                const focusProperties = {
                    sectionId,
                    native: true,
                };

                if (!this.fireEvent(target, 'willfocus', focusProperties)) {
                    this.duringFocusChange = true;
                    target.blur();
                    this.duringFocusChange = false;
                } else {
                    this.fireEvent(target, 'focused', focusProperties, false);
                    this.focusChanged(target, sectionId);
                }
            }
        }
    }

    private onBlur(event: FocusEvent): void {
        const { target } = event;
        if (
            isHTMLElement(target) &&
            !this.pause &&
            this.sections.size &&
            !this.duringFocusChange &&
            this.getSectionId(target)
        ) {
            const unfocusProperties = {
                native: true,
            };
            if (!this.fireEvent(target, 'willunfocus', unfocusProperties)) {
                this.duringFocusChange = true;
                setTimeout(() => {
                    target.focus({ preventScroll: true });
                    this.duringFocusChange = false;
                });
            } else {
                this.fireEvent(target, 'unfocused', unfocusProperties, false);
            }
        }
    }

    private boundedOnKeyDown = this.onKeyDown.bind(this);

    private boundedOnKeyUp = this.onKeyUp.bind(this);

    private boundedOnFocus = this.onFocus.bind(this);

    private boundedOnBlur = this.onBlur.bind(this);

    /** ***************** */
    /* Public Function */
    /** ***************** */

    /**
     * Включает навигацию:
     * - устанавливает секцию по умолчанию, если был передан параметр
     * - добавляет EventListener'ы на window для работы навигации
     *
     * @param defaultSectionId
     */
    init(defaultSectionId = ''): void {
        this.defaultSectionId = defaultSectionId;
        if (!this.ready) {
            window.addEventListener('keydown', this.boundedOnKeyDown);
            window.addEventListener('keyup', this.boundedOnKeyUp);
            window.addEventListener('focus', this.boundedOnFocus, true);
            window.addEventListener('blur', this.boundedOnBlur, true);
            this.ready = true;
        }
    }

    /**
     * Выключает навигацию:
     * - удаляет все секции
     * - удаляет все EventListener'ы из window
     * - удаляет секцию по умолчанию
     * - удаляет последнюю активную секцию
     * - сбрасывает счётчик секций для генерации id секций
     */
    uninit(): void {
        window.removeEventListener('keydown', this.boundedOnKeyDown);
        window.removeEventListener('keyup', this.boundedOnKeyUp);
        window.removeEventListener('focus', this.boundedOnFocus, true);
        window.removeEventListener('blur', this.boundedOnBlur, true);
        this.clear();
        this.idPool = 0;
        this.ready = false;
    }

    /**
     * - удаляет все секции
     * - удаляет секцию по умолчанию
     * - удаляет последнюю активную секцию
     */
    clear(): void {
        this.sections.clear();
        this.defaultSectionId = '';
        this.lastSectionId = '';
        this.duringFocusChange = false;
    }

    /**
     *  Кастомизация глобального конфига SpatialNavigation
     *
     * @param spatialNavigationConfig объект, содержащий все кастомизируемые свойства SpatialNavigation
     *
     * @param spatialNavigationConfig.config непосредственный общий конфиг для секции, для которых не задан собственный конфиг
     *
     * @param spatialNavigationConfig.eventPrefix префикс кастомных событий Spatial Navigation. По умолчанию `sn:`
     *
     * @param spatialNavigationConfig.idPoolPrefix префикс автоматических имён секций. Применяется если создать секцию без имени. По умолчанию `section-`
     */
    customizeGlobalConfig({ config, eventPrefix, idPoolPrefix }: SpatialNavigationGlobalConfig = {}): void {
        if (typeof config !== 'undefined') {
            Object.assign(this.globalConfig, config);
        }

        if (typeof eventPrefix === 'string') {
            this.EVENT_PREFIX = eventPrefix;
        }

        if (typeof idPoolPrefix === 'string') {
            this.ID_POOL_PREFIX = idPoolPrefix;
        }
    }

    /**
     * Проверяет существует ли секция в spatnav instance.
     *
     * @param sectionId
     *
     * @returns `true` если секция существует
     */
    has(sectionId: string): boolean {
        return this.sections.has(sectionId);
    }

    /**
     * @param sectionId
     *
     * @returns Section или undefined если секции с таким id нет
     */
    get<S extends SectionName = SectionName>(sectionId: S): Section<S> | undefined {
        return this.sections.get(sectionId) as Section<S>;
    }

    /**
     * Перезаписывает конфиг секции с помощью Object.assign
     *
     * @param sectionId
     *
     * @param config
     */
    set(sectionId: string, config: Partial<Config> = {}): void {
        const section = this.sections.get(sectionId);
        if (section) {
            Object.assign(section.config, config);
        }
    }

    /**
     * Добавляет секцию в spatnav instance. После добавления она сразу доступна для навигации.
     *
     * @param sectionId
     *
     * @param config
     *
     * @returns секция
     */
    add<S extends SectionName = SectionName>(sectionId: S, config: Partial<Config>): Section<S> {
        const id = sectionId || this.generateId();

        if (this.sections.has(id)) {
            throw new Error(`Секция "${id}" уже существует`);
        }

        this.sections.set(id, {
            id,
            lastFocusedElement: undefined,
            config: { ...this.globalConfig, ...config, previous: undefined },
        });

        if (this.sections.size === 1) {
            this.setDefaultSection(id);
        }

        const section = this.sections.get(id);

        if (!section) {
            throw new Error('Внутренняя ошибка создания секции');
        }

        return section as Section<S>;
    }

    /**
     * Удаляет секцию из spatnav instance.
     *
     * @param sectionId
     *
     * @returns `true` если секция была удалена
     */
    remove(sectionId: string): boolean {
        const deleted = this.sections.delete(sectionId);

        if (deleted && this.lastSectionId === sectionId) {
            this.lastSectionId = '';
        }

        return deleted;
    }

    /**
     * Выключает навигацию в данной секции.
     *
     * @param sectionId
     *
     * @returns `true` если секция была выключена
     */
    disable(sectionId: string): boolean {
        const config = this.sections.get(sectionId)?.config;

        if (config) {
            config.disabled = true;
            return true;
        }

        return false;
    }

    /**
     * Включает навигацию в данной секции.
     *
     * @param sectionId
     *
     * @returns `true` если секция была включена
     */
    enable(sectionId: string): boolean {
        const config = this.sections.get(sectionId)?.config;

        if (config) {
            config.disabled = false;
            return true;
        }

        return false;
    }

    /**
     * Выключает навигацию полностью.
     */
    pauseNavigation(): void {
        this.pause = true;
    }

    /**
     * Включает навигацию полностью.
     */
    resumeNavigation(): void {
        this.pause = false;
    }

    /**
     * Фокусирует секцию по умолчанию
     *
     * @param [silent=false] - silent в значение true позволяет вам сфокусировать элемент без внутренних событий spatnav instance
     */
    focus(silent?: boolean): boolean;

    /**
     * Фокусирует секцию с указанным sectionId или первым элементом, который соответствует ExtendedSelector
     *
     * @param extSelector - extSelector
     *
     * @param [silent=false] - silent в значение true позволяет вам сфокусировать элемент без внутренних событий spatnav instance
     */
    focus(extSelector: ExtendedSelector, silent?: boolean): boolean;

    focus(silentOrSectionIdOrExtSelector: boolean | ExtendedSelector = false, silentArgs = false): boolean {
        let result = false;
        let sectionId: string | undefined;
        let extSelector: ExtendedSelector | undefined;
        let silent: boolean;

        if (typeof silentOrSectionIdOrExtSelector === 'boolean') {
            silent = silentOrSectionIdOrExtSelector;
        } else if (
            typeof silentOrSectionIdOrExtSelector === 'string' &&
            this.sections.has(silentOrSectionIdOrExtSelector)
        ) {
            sectionId = silentOrSectionIdOrExtSelector;
            silent = silentArgs;
        } else {
            extSelector = silentOrSectionIdOrExtSelector;
            silent = silentArgs;
        }

        const autoPause = !this.pause && silent;

        if (autoPause) {
            this.pauseNavigation();
        }
        if (typeof sectionId === 'string' && this.sections.has(sectionId)) {
            result = this.focusSection(sectionId);
        } else if (typeof extSelector !== 'undefined') {
            result = this.focusExtendedSelector(extSelector);
        } else {
            result = this.focusDefaultSection();
        }

        if (autoPause) {
            this.resumeNavigation();
        }

        return result;
    }

    /**
     * Перемещает фокус в указанном направлении как будто была нажата кнопка (вверх, вниз итд.) от текущего активного элемента
     *
     * @param direction - направление перехода
     *
     * @returns - произошёл ли переход
     */
    move(direction: Direction): boolean;

    /**
     * Перемещает фокус в указанном направлении как будто была нажата кнопка (вверх, вниз итд.) относительно выбранного элемента
     *
     * @param direction - направление перехода
     *
     * @param selector - точка отсчёта перехода (должен соответствовать querySelector или querySelectorAll)
     *
     * @returns - произошёл ли переход
     */
    move(direction: Direction, selector: string): boolean;

    move(direction: Direction, selector?: string): boolean {
        if (!(direction in REVERSE)) {
            return false;
        }

        const elem = selector ? parseSelector(selector)[0] : getCurrentFocusedElement();
        if (!elem) {
            return false;
        }

        const sectionId = this.getSectionId(elem);
        if (!sectionId) {
            return false;
        }

        const willmoveProperties = {
            direction,
            sectionId,
            cause: 'api',
        };

        if (!this.fireEvent(elem, 'willmove', willmoveProperties)) {
            return false;
        }

        return this.focusNext(direction, elem, sectionId);
    }

    /**
     * Для всех элементов секции устанавливает аттрибут `tabindex = "-1"`.
     * Если sectionId не указан, он применяется ко всем секциям.
     *
     * @param sectionId
     */
    makeFocusable(sectionId?: string): void {
        const doMakeFocusable = (section: Section): void => {
            const tabIndexIgnoreList =
                section.config.tabIndexIgnoreList !== undefined
                    ? section.config.tabIndexIgnoreList
                    : this.globalConfig.tabIndexIgnoreList;
            parseSelector(section.config.selector).forEach((element) => {
                if (!matchSelector(element, tabIndexIgnoreList)) {
                    if (!element.getAttribute('tabindex')) {
                        element.setAttribute('tabindex', '-1');
                    }
                }
            });
        };

        if (sectionId) {
            const section = this.sections.get(sectionId);
            if (section) {
                doMakeFocusable(section);
            } else {
                throw new Error(`Секция "${sectionId}" не существует`);
            }
        } else {
            for (const [, section] of this.sections) {
                doMakeFocusable(section);
            }
        }
    }

    /**
     * Устанавливает секцию по умолчанию
     *
     * @param sectionId
     */
    setDefaultSection(sectionId: string): void {
        if (!sectionId) {
            this.defaultSectionId = '';
        } else if (!this.sections.has(sectionId)) {
            throw new Error(`Секция "${sectionId}" не существует`);
        } else {
            this.defaultSectionId = sectionId;
        }
    }

    /**
     * Забыть последний элемент в данной секции
     *
     * @param sectionId
     */
    forgetLastElementInSection(sectionId: string): void {
        const section = this.sections.get(sectionId);

        if (sectionId && section) {
            section.lastFocusedElement = undefined;
        }
    }

    /**
     * Забыть последний элемент во всех секциях
     */
    forgetLastElementInAllSections(): void {
        for (const [, section] of this.sections) {
            section.lastFocusedElement = undefined;
        }
    }

    /**
     * Установить фокус на секцию по умолчанию
     */
    focusDefaultSection(): boolean {
        return this.focusSection(this.defaultSectionId);
    }

    /**
     *
     * @returns находится ли хоть одна секция в фокусе
     */
    isAnySectionFocused(): boolean {
        const element = getCurrentFocusedElement();

        if (!element) {
            return false;
        }

        for (const [, section] of this.sections) {
            const result = matchSelector(element, section.config.selector);
            if (result) {
                return result;
            }
        }

        return false;
    }
}
