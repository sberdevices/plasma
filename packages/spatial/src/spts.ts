import {
    exclude,
    getCurrentFocusedElement,
    matchSelector,
    parseSelector,
    navigate,
    isHTMLElement,
    isNavKey,
} from './utils/spatialUtils';
import { Config, Section, DIRECTION, ENTER_TO, ExtendedSelector, RESTRICT, NAV_KEYS } from './utils/types';

interface SpatialNavigationConfig {
    config?: Config;
    eventPrefix?: string;
    idPoolPrefix?: string;
}

class SpatialNavigation {
    constructor({ config, eventPrefix, idPoolPrefix }: SpatialNavigationConfig = {}) {
        if (typeof config === 'object' && config !== null) {
            this.globalConfig = { ...this.globalConfig, ...config };
        }
        if (typeof eventPrefix === 'string') {
            this.EVENT_PREFIX = eventPrefix;
        }
        if (typeof idPoolPrefix === 'string') {
            this.ID_POOL_PREFIX = idPoolPrefix;
        }
    }

    private readonly globalConfig: Config = {
        selector: '',
        straightOnly: false,
        straightOverlapThreshold: 0.5,
        rememberSource: false,
        disabled: false,
        defaultElement: '',
        enterTo: ENTER_TO.EMPTY,
        leaveFor: null,
        restrict: RESTRICT.SELF_FIRST,
        tabIndexIgnoreList: 'a, input, select, textarea, button, iframe, [contentEditable=true]',
        navigableFilter: null,
    };

    private readonly KEY_MAPPING: Record<NAV_KEYS, DIRECTION> = {
        [NAV_KEYS.ARROW_LEFT]: 'left',
        [NAV_KEYS.ARROW_UP]: 'up',
        [NAV_KEYS.ARROW_RIGHT]: 'right',
        [NAV_KEYS.ARROW_DOWN]: 'down',
    };

    private readonly REVERSE: Record<DIRECTION, DIRECTION> = {
        left: 'right',
        up: 'down',
        right: 'left',
        down: 'up',
    };

    private readonly EVENT_PREFIX: string = 'sn:';

    private readonly ID_POOL_PREFIX: string = 'section-';

    private idPool = 0;

    private ready = false;

    private pause = false;

    private sections: { [index: string]: Section } = {};

    private get sectionCount(): number {
        return Object.keys(this.sections).length;
    }

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
            if (!this.sections[id]) {
                break;
            }
        }
        return id;
    }

    private isNavigable(element: HTMLElement, sectionId?: string, verifySectionSelector?: boolean): boolean {
        if (!element || !sectionId || !this.sections[sectionId] || this.sections[sectionId].disabled) {
            return false;
        }

        const section = this.sections[sectionId];

        // element has 0 by 0 size or has disabled attribute
        if (
            isHTMLElement(element) &&
            ((element.offsetWidth <= 0 && element.offsetHeight <= 0) || element.hasAttribute('disabled'))
        ) {
            return false;
        }

        if (isHTMLElement(element) && verifySectionSelector && !matchSelector(element, section.selector)) {
            return false;
        }
        if (typeof section.navigableFilter === 'function') {
            if (section.navigableFilter(element, sectionId) === false) {
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
        const entries = Object.entries(this.sections);
        for (let i = 0; i < entries.length; i += 1) {
            const [id, section] = entries[i];
            if (!section.disabled && matchSelector(element, section.selector)) {
                return id;
            }
        }
        return undefined;
    }

    private getSectionNavigableElements(sectionId: string): HTMLElement[] {
        return parseSelector(this.sections[sectionId].selector).filter((element) => {
            return this.isNavigable(element, sectionId);
        });
    }

    private getSectionDefaultElement(sectionId: string): HTMLElement | null {
        let element: HTMLElement | undefined;
        const { defaultElement } = this.sections[sectionId];
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
        const { lastFocusedElement = null } = this.sections[sectionId];
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
            this.sections[id].lastFocusedElement = element;
            this.lastSectionId = id;
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

    private focusSection(sectionId?: string): boolean {
        const range: string[] = [];

        const addRange = (id: string): void => {
            if (id && !range.includes(id) && this.sections[id] && !this.sections[id].disabled) {
                range.push(id);
            }
        };

        if (sectionId) {
            addRange(sectionId);
        } else {
            addRange(this.defaultSectionId);
            addRange(this.lastSectionId);
            Object.keys(this.sections).map(addRange);
        }

        for (let i = 0; i < range.length; i += 1) {
            const id = range[i];
            let next;

            if (this.sections[id].enterTo === ENTER_TO.LAST_FOCUSED) {
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

    private fireNavigatefailed(element: HTMLElement, direction: DIRECTION): void {
        this.fireEvent(
            element,
            'navigatefailed',
            {
                direction,
            },
            false,
        );
    }

    private gotoLeaveFor(sectionId: string, direction: DIRECTION): boolean | null {
        const section = this.sections[sectionId];
        if (section.leaveFor) {
            let next: string | HTMLElement | NodeList | HTMLElement[] | undefined | void;
            const leaveFor = section.leaveFor[direction];
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

    private focusNext(direction: DIRECTION, currentFocusedElement: HTMLElement, currentSectionId: string): boolean {
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

        const keys = Object.keys(this.sections);

        for (let i = 0; i < keys.length; i += 1) {
            const id = keys[i];
            sectionNavigableElements[id] = this.getSectionNavigableElements(id);
            allNavigableElements = allNavigableElements.concat(sectionNavigableElements[id]);
        }

        const config = { ...this.globalConfig, ...this.sections[currentSectionId] };
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
            this.sections[currentSectionId].previous = {
                target: currentFocusedElement,
                destination: next,
                reverse: this.REVERSE[direction],
            };

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
                    switch (this.sections[nextSectionId].enterTo) {
                        case ENTER_TO.LAST_FOCUSED:
                            enterToElement =
                                this.getSectionLastFocusedElement(nextSectionId) ||
                                this.getSectionDefaultElement(nextSectionId);
                            break;
                        case ENTER_TO.DEFAULT_ELEMENT:
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

    throttleKeyDown = false;

    setThrottleKeyDown = (): void => {
        this.throttleKeyDown = false;
    };

    private onKeyDown(event: KeyboardEvent): boolean {
        if (this.throttleKeyDown) {
            return this.preventDefault(event);
        }

        window.requestAnimationFrame(this.setThrottleKeyDown);

        this.throttleKeyDown = true;

        if (!this.sectionCount || this.pause || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return false;
        }

        let currentFocusedElement: HTMLElement | null;

        const direction = isNavKey(event.code) ? this.KEY_MAPPING[event.code] : undefined;

        if (!direction) {
            if (event.code === 'Enter' || event.code === 'Escape') {
                currentFocusedElement = getCurrentFocusedElement();
                if (currentFocusedElement && this.getSectionId(currentFocusedElement)) {
                    if (!this.fireEvent(currentFocusedElement, event.code === 'Enter' ? 'enter-down' : 'escape-down')) {
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
        if (!this.pause && this.sectionCount && (event.code === 'Enter' || event.code === 'Escape')) {
            const currentFocusedElement = getCurrentFocusedElement();
            if (currentFocusedElement && this.getSectionId(currentFocusedElement)) {
                if (!this.fireEvent(currentFocusedElement, event.code === 'Enter' ? 'enter-up' : 'escape-up')) {
                    event.preventDefault();
                    // event.stopPropagation();
                }
            }
        }
        return undefined;
    }

    private onFocus(event: FocusEvent): undefined | void {
        const { target } = event;
        if (isHTMLElement(target) && this.sectionCount && !this.duringFocusChange) {
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
            this.sectionCount &&
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

    boundedOnKeyDown = this.onKeyDown.bind(this);

    boundedOnKeyUp = this.onKeyUp.bind(this);

    boundedOnFocus = this.onFocus.bind(this);

    boundedOnBlur = this.onBlur.bind(this);

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

    uninit(): void {
        window.removeEventListener('keydown', this.boundedOnKeyDown);
        window.removeEventListener('keyup', this.boundedOnKeyUp);
        window.removeEventListener('focus', this.boundedOnFocus, true);
        window.removeEventListener('blur', this.boundedOnBlur, true);
        this.clear();
        this.idPool = 0;
        this.ready = false;
    }

    clear(): void {
        this.sections = {};
        this.defaultSectionId = '';
        this.lastSectionId = '';
        this.duringFocusChange = false;
    }

    has(sectionId: string): boolean {
        return sectionId in this.sections;
    }

    get(sectionId: string): Section | undefined {
        return this.sections[sectionId];
    }

    set(sectionId: string, config: Partial<Config> = {}): void {
        Object.assign(this.sections[sectionId], config);
    }

    /**
     *
     * @param {Partial<Config>} config
     *
     * @returns {string} sectionId
     */
    add(config: Partial<Config>): string;

    /**
     * @param {string} sectionId
     *
     * @param {Partial<Config>} config
     *
     * @returns {string} sectionId
     */
    add(sectionId: string, config: Partial<Config>): string;

    add(configOrSection: Partial<Config> | string, configArgs?: Partial<Config>): string {
        let sectionId: string | undefined;
        let config: Partial<Config> = {};

        if (typeof configOrSection === 'object') {
            config = configOrSection;
        } else if (typeof configOrSection === 'string') {
            sectionId = configOrSection;
            if (typeof configArgs === 'object') {
                config = configArgs;
            }
        }

        if (typeof sectionId === 'undefined') {
            sectionId = typeof config.id === 'string' ? config.id : this.generateId();
        }

        if (this.sections[sectionId]) {
            throw new Error(`Section "${sectionId}" has already existed!`);
        }

        this.sections[sectionId] = { ...this.globalConfig, ...config, lastFocusedElement: undefined };

        return sectionId;
    }

    remove(sectionId: string): boolean {
        if (!sectionId || typeof sectionId !== 'string') {
            throw new Error('Please assign the "sectionId"!');
        }

        if (typeof this.sections[sectionId] !== 'undefined') {
            delete this.sections[sectionId];
            if (this.lastSectionId === sectionId) {
                this.lastSectionId = '';
            }
            return true;
        }
        return false;
    }

    disable(sectionId: string): boolean {
        if (this.sections[sectionId]) {
            this.sections[sectionId].disabled = true;
            return true;
        }
        return false;
    }

    enable(sectionId: string): boolean {
        if (this.sections[sectionId]) {
            this.sections[sectionId].disabled = false;
            return true;
        }
        return false;
    }

    pauseNavigation(): void {
        this.pause = true;
    }

    resumeNavigation(): void {
        this.pause = false;
    }

    /**
     * @param {boolean} [silent=false] - if set to true focus without triggering custom events. False by default
     */
    focus(silent?: boolean): boolean;

    /**
     * @param {string} sectionId - section id
     * @param {boolean} [silent=false] - if set to true focus without triggering custom events. False by default
     */
    focus(sectionId: string, silent?: boolean): boolean;

    /**
     * @param {string | ExtendedSelector} extSelector - extSelector
     * @param {boolean} [silent=false] - if set to true focus without triggering custom events. False by default
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
            silentOrSectionIdOrExtSelector in this.sections
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
        if (typeof sectionId === 'string' && sectionId in this.sections) {
            this.focusSection(sectionId);
        }
        if (typeof extSelector !== 'undefined') {
            result = this.focusExtendedSelector(extSelector);
        }

        if (autoPause) {
            this.resumeNavigation();
        }

        return result;
    }

    move(direction: DIRECTION): boolean;

    move(direction: DIRECTION, selector: string): boolean;

    move(direction: DIRECTION, selector?: string): boolean {
        if (!(direction in this.REVERSE)) {
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

    makeFocusable(sectionId?: string): void {
        const doMakeFocusable = (section: Section): void => {
            const tabIndexIgnoreList =
                section.tabIndexIgnoreList !== undefined
                    ? section.tabIndexIgnoreList
                    : this.globalConfig.tabIndexIgnoreList;
            parseSelector(section.selector).forEach((element) => {
                if (!matchSelector(element, tabIndexIgnoreList)) {
                    if (!element.getAttribute('tabindex')) {
                        element.setAttribute('tabindex', '-1');
                    }
                }
            });
        };

        if (sectionId) {
            if (this.sections[sectionId]) {
                doMakeFocusable(this.sections[sectionId]);
            } else {
                throw new Error(`Section "${sectionId}" doesn't exist!`);
            }
        } else {
            Object.values(this.sections).forEach((section) => {
                doMakeFocusable(section);
            });
        }
    }

    setDefaultSection(sectionId: string): void {
        if (!sectionId) {
            this.defaultSectionId = '';
        } else if (!this.sections[sectionId]) {
            throw new Error(`Section "${sectionId}" doesn't exist!`);
        } else {
            this.defaultSectionId = sectionId;
        }
    }

    forgetLastElement(sectionId: string): void {
        if (sectionId && this.sections[sectionId]) {
            this.sections[sectionId].lastFocusedElement = undefined;
        }
    }

    forgetAllLastElements(): void {
        Object.values(this.sections).forEach((section) => {
            section.lastFocusedElement = undefined;
        });
    }

    focusDefaultSection(): void {
        this.focus(this.defaultSectionId);
    }
}

export { SpatialNavigation };
