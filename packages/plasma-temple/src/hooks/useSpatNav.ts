import React from 'react';

interface UseSpatNavCallback<T> {
    (container: T): void;
}

export const useSpatNav = <T extends HTMLElement>(callback: UseSpatNavCallback<T>): void => {
    const prevContainer = React.useRef(document.documentElement);

    React.useLayoutEffect(() => {
        const spatNavCb = (event: Event) => {
            event.stopPropagation();

            const { target } = event;
            const container = target?.getSpatialNavigationContainer<T>();

            if (container && container !== prevContainer.current) {
                callback(container);
                prevContainer.current = container;
            }

            if (container === document.body) {
                callback((target as unknown) as T);
                return;
            }

            return false;
        };

        document.body.addEventListener('navbeforefocus', spatNavCb);

        return () => {
            document.body.removeEventListener('navbeforefocus', spatNavCb);
        };
    });
};

interface ConditionCallback {
    (activeElement: NonNullable<typeof document.activeElement>): boolean;
}

export const useActiveElementClick = (conditionCb: ConditionCallback = () => true): void => {
    React.useLayoutEffect(() => {
        const keyUpHander = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (
                    document.activeElement &&
                    document.activeElement !== document.documentElement &&
                    conditionCb(document.activeElement)
                ) {
                    document.activeElement.click();
                }
            }

            return false;
        };

        document.addEventListener('keyup', keyUpHander);

        return () => {
            document.removeEventListener('keyup', keyUpHander);
        };
    }, [conditionCb]);
};