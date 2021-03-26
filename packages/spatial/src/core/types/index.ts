export interface Center {
    x: number;
    y: number;
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}

export interface Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    element: HTMLElement;
    center: Center;
}

export type Partition = Rect[][];

interface DistanceFunction {
    (rect: Rect): number;
}

export interface DistanceFunctions {
    nearPlumbLineIsBetter: DistanceFunction;
    nearHorizonIsBetter: DistanceFunction;
    nearTargetLeftIsBetter: DistanceFunction;
    nearTargetTopIsBetter: DistanceFunction;
    topIsBetter: DistanceFunction;
    bottomIsBetter: DistanceFunction;
    leftIsBetter: DistanceFunction;
    rightIsBetter: DistanceFunction;
}

export interface Priority {
    group: Rect[];
    distance: DistanceFunction[];
}

export type EnterTo = 'calculated' | 'last-focused' | 'default-element';

export type NavigationKeyCodes = 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown';

export type Restrict = 'none' | 'self-only' | 'self-first';

export type Direction = 'none' | 'left' | 'right' | 'up' | 'down';

export type LeaveForDirection = 'left' | 'right' | 'up' | 'down';

/**
 * ExtendedSelector:
 * - a valid selector string for `querySelectorAll`
 * - a NodeList
 * - an array of HTMLElement
 * - a single DOM element
 * - a string "@<sectionId>" to indicate the specified section
 * - a string "@" to indicate the default section
 */
export type ExtendedSelector = string | HTMLElement | NodeList | HTMLElement[];

/**
 * ExtendedSelector или callback, возвращающий ExtendedSelector или вовсе выполняющий произвольные действия
 */
type LeaveFor = Partial<Record<Direction, ExtendedSelector | (() => ExtendedSelector | undefined | void)>>;

interface NavigableFilter {
    (element: HTMLElement, sectionId: string): boolean;
}

export type SectionName = string;

export type Config = {
    /**
     * ExtendedSelector:
     * - a valid selector string for `querySelectorAll`
     * - a NodeList
     * - an array of HTMLElement
     * - a single DOM element
     */
    selector: ExtendedSelector;

    /**
     * Spatial Navigation будет искать только элементы, лежащие на одной линии (вертикально или горизонтально) с текущим активным элементом
     *
     * По умолчанию считается только элементы лежащие пиксель в пиксель на одной линии.
     *
     * Если `straightOnly` нажатия вниз элемент `next` будет пропущен и будет выбран `real next`
     *
     * @example
     * ```
     *      ┏━━━━━━━━━┓
     *      ┃ focused ┃
     *      ┗━━━━━━━━━┛
     *           ↓
     * ┏━━━━━━━┓ ↓
     * ┃ next? ┃ ↓
     * ┗━━━━━━━┛ ↓
     *           ↓
     *     ┏━━━━━━━━━━━┓
     *     ┃ real next ┃
     *     ┗━━━━━━━━━━━┛
     * ```
     */
    straightOnly: boolean;

    /**
     * Это свойство используется для определения того, что считать за элемент, находящийся на одной линии.
     * Допустимые значения от 0 до 1.0.
     * Значение 0.5 означает, что элемент считается стоящим на одной линии с текущим, только в том случае, если он перекрывает прямую область в направлении перехода не менее чем на половину.
     */
    straightOverlapThreshold: number;

    /**
     * Если это `true`, то элемент, на который был активным до этого, будет иметь более высокий приоритет при дальнейшей навигации
     */
    rememberSource: boolean;

    /**
     * Определяет можно ли выбрать элемент секции с помощью клавиш
     */
    disabled: boolean;

    /**
     * ExtendedSelector:
     * - a valid selector string for `querySelectorAll`
     * - a NodeList
     * - an array of HTMLElement
     * - a single DOM element
     */
    defaultElement: ExtendedSelector;

    /**
     * Определяет какой элемент выбрать при входе в секцию
     *
     * - `calculated` - Spatial Navigation сам выберет элемент для фокуса
     *
     * - `last-focused` - Последний элемент, который был в фокусе в данной секции, если такого нет - так же как `calculated`
     *
     * - `default-element` - Элемент установленный в свойстве defaultElement
     */
    enterTo: EnterTo;

    /**
     * Переопределяет поведение Spatial Navigation при выходе из текущей секции.
     * Например можно явно указать другую секцию `@sectionId` или конкретный элемент `#header`
     *
     * - `left`, `right`, `up`, `down`: ExtendedSelector или callback, возвращающий ExtendedSelector или вовсе выполняющий произвольные действия
     *
     * @example
     * ```typescript
     * mainSection.leaveFor = {
     *      top: '#header',
     *      right: '@mySection',
     *      left: () => { window.history.pop() },
     *      down: () => globalFlag ? '@' : document.querySelectorAll(".my-class")
     * }
     * ```
     *
     * @description
     *
     * ExtendedSelector:
     * - a valid selector string for `querySelectorAll`
     * - a NodeList
     * - an array of `HTMLElement`
     * - a single DOM element
     * - a string "@<sectionId>" to indicate the specified section
     * - a string "@" to indicate the default section
     */
    leaveFor: LeaveFor | null;

    /**
     * Определяет ограничения при перемещении внутри текущей секции.
     *
     * - `none` - никаких ограничений, Spatial Navigation сам выберет элемент для фокуса
     *
     * - `self-only` - ограничивает навигацию только в данной секции. Элементы из других групп можно будет выбрать только с помощью функции `elementFromDifferentGroup.focus()`
     *
     * - `self-first` - элементы внутри данной группы имеют более высокий приоритет, чем элементы из других групп
     */
    restrict: Restrict;

    /**
     * строка подходящая для `querySelectorAll`, содержащая список селекторов элементов,
     * которые не будут "превращены" в активные при вызове spatnavInstance.makeFocusable()
     */
    tabIndexIgnoreList: string;

    /**
     * Если определена будет вызываться при каждом переключении элемента внутри секции (или между ними) принимая два параметра:
     * сам элемент и id секции. В этом callback вы можете явно определить нужно ли переходить на этот элемент или нет,
     * возвращая соответствующий результат `true` или `false`
     *
     * @example
     * ```typescript
     * // С вероятностью 50/50 будет игнорировать элементы в секции mainSection
     * mainSection.navigableFilter = () => Math.random() >= 0.5;
     * ```
     */
    navigableFilter: NavigableFilter | null;

    /**
     * Этот объект не предназначен для прямого изменения и нужен только для работы внутренних событий
     */
    previous?: {
        target?: HTMLElement;
        destination?: HTMLElement;
        reverse?: string;
    };
};

export interface Section<S extends SectionName = SectionName> {
    /**
     * id секции
     */
    id: S;

    /**
     * Конфиг текущей секции
     */
    config: Config;

    /**
     * Последний элемент, который был активным в этой секции
     */
    lastFocusedElement?: HTMLElement;
}
