import { AssistantWindow, AssistantHost as DefaultAssistantHost, AssistantClient } from '@sberdevices/assistant-client';

export declare global {
    enum FocusableAreaSearchMode {
        'visible',
        'all',
    }

    enum SpatialNavigationDirection {
        'up',
        'down',
        'left',
        'right',
    }

    interface SpatialNavigationSearchOptions {
        candidates: Node[];
        container: Node;
    }

    interface FocusableAreasOption {
        mode: FocusableAreaSearchMode;
    }

    interface AssistantHost extends DefaultAssistantHost {
        sendData: (command: string, message?: any) => void;
    }

    interface Window extends AssistantWindow {
        navigate(dir: SpatialNavigationDirection): void;
        AssistantHost: AssistantHost;
        AssistantClient: AssistantClient;
        Cypress?: Record<string, any>;
    }

    interface Element {
        getSpatialNavigationContainer<T extends Element>(): T;
        focusableAreas(opts: FocusableAreasOption): Element[];
        spatialNavigationSearch(dir: SpatialNavigationDirection, opts?: SpatialNavigationSearchOptions): Element;
        click(): void;
    }

    interface EventTarget {
        click(): void;
        getSpatialNavigationContainer<T extends Element>(): T;
        focusableAreas(opts: FocusableAreasOption): Element[];
        spatialNavigationSearch(dir: SpatialNavigationDirection, opts?: SpatialNavigationSearchOptions): Element;
    }
}
