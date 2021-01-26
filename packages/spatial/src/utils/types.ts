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

export enum ENTER_TO {
    EMPTY = '',
    LAST_FOCUSED = 'last-focused',
    DEFAULT_ELEMENT = 'default-element',
}

export enum NAV_KEYS {
    ARROW_LEFT = 'ArrowLeft',
    ARROW_UP = 'ArrowUp',
    ARROW_RIGHT = 'ArrowRight',
    ARROW_DOWN = 'ArrowDown',
}

export enum RESTRICT {
    NONE = 'none',
    SELF_ONLY = 'self-only',
    SELF_FIRST = 'self-first',
}

export type DIRECTION = 'left' | 'right' | 'up' | 'down';

/**
 * ExtendedSelector:
 * - a valid selector string for "querySelectorAll"
 * - a NodeList
 * - an array of HTMLElement
 * - a single DOM element
 * - a string "@<sectionId>" to indicate the specified section
 * - a string "@" to indicate the default section
 */
export type ExtendedSelector = string | HTMLElement | NodeList | HTMLElement[];

/**
 * ExtendedSelector but lacks "@<sectionId>" syntax
 */
type LeaveFor = Partial<Record<DIRECTION, ExtendedSelector | (() => ExtendedSelector | undefined | void)>>;

interface NavigableFilter {
    (element: HTMLElement, sectionId: string): boolean;
}

export type Config = {
    /**
     * id is optional, but will overwrite sectionId param in SpatialNavigation.add method
     */
    id?: string;
    /**
     * ExtendedSelector without "@<sectionId>" syntax
     */
    selector: ExtendedSelector;
    straightOnly: boolean;
    straightOverlapThreshold: number;
    rememberSource: boolean;
    disabled: boolean;
    /**
     * ExtendedSelector without "@<sectionId>" syntax
     */
    defaultElement: ExtendedSelector;
    /**
     * EMPTY = ''
     *
     * LAST_FOCUSED = 'last-focused'
     *
     * DEFAULT_ELEMENT = 'default-element'
     */
    enterTo: ENTER_TO;
    /**
     *  left: ExtendedSelector without "@<sectionId>" syntax,
     *
     *  right: ExtendedSelector without "@<sectionId>" syntax,
     *
     *  up: ExtendedSelector without "@<sectionId>" syntax,
     *
     *  down: ExtendedSelector without "@<sectionId>" syntax
     */
    leaveFor: LeaveFor | null;
    /**
     *
     * NONE = 'none'
     *
     * SELF_ONLY = 'self-only'
     *
     * SELF_FIRST = 'self-first'
     */
    restrict: RESTRICT;
    tabIndexIgnoreList: string;
    navigableFilter: NavigableFilter | null;
    previous?: {
        target?: HTMLElement;
        destination?: HTMLElement;
        reverse?: string;
    };
};

export interface Section extends Config {
    lastFocusedElement?: HTMLElement;
}
