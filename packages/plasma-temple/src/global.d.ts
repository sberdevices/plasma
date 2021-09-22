import { AssistantWindow, AssistantHost as DefaultAssistantHost, AssistantClient } from '@sberdevices/assistant-client';

export declare global {
    enum FocusableAreaSearchMode {
        'visible',
        'all',
    }

    type SpatialNavigationDirection = 'up' | 'down' | 'left' | 'right';
    interface SpatialNavigationSearchOptions {
        candidates: Node[];
        container: Node;
    }

    interface FocusableAreasOption {
        mode: FocusableAreaSearchMode;
    }

    interface AssistantHost extends DefaultAssistantHost {
        sendData: (command: string, message?: string) => void;
    }

    interface SpatialNavigation {
        setStartingPoint: (x?: number, y?: number) => void;
    }

    interface Window extends AssistantWindow {
        navigate(dir: SpatialNavigationDirection): void;
        AssistantHost: AssistantHost;
        AssistantClient: AssistantClient;
        Cypress?: Record<string, unknown>;
        __spatialNavigation__?: SpatialNavigation;
    }

    interface SpatialNavigationEventDetail {
        dir: SpatialNavigationDirection;
    }

    type SpatialNavigationEvent = CustomEvent<SpatialNavigationEventDetail>;

    interface Element {
        getSpatialNavigationContainer<T extends Element>(): T;
        focusableAreas(opts: FocusableAreasOption): Element[];
        spatialNavigationSearch(dir: SpatialNavigationDirection, opts?: SpatialNavigationSearchOptions): Element;
        click(): void;
    }

    interface SpatialEventMap extends HTMLElementEventMap {
        navbeforefocus: SpatialNavigationEvent;
        navnofocus: SpatialNavigationEvent;
    }

    interface EventTarget {
        click(): void;
        getSpatialNavigationContainer<T extends Element>(): T;
        focusableAreas(opts: FocusableAreasOption): Element[];
        spatialNavigationSearch(dir: SpatialNavigationDirection, opts?: SpatialNavigationSearchOptions): Element;
    }
}
