import React from 'react';

interface UseSpatNavCallback<T> {
    (target: T): void;
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

const dirByAxis = {
    x: 'left,right',
    y: 'up,down',
};

const isSpatNavEvent = (event: unknown): event is SpatialNavigationEvent => event instanceof Event && 'detail' in event;

export const useSpatNavBetweenTargets = <T extends HTMLElement>(
    axis: 'x' | 'y',
    callback: UseSpatNavCallback<T>,
): void => {
    const prevTarget = React.useRef(document.documentElement);

    React.useLayoutEffect(() => {
        const spatNavCb = (event: Event) => {
            if (!isSpatNavEvent(event)) {
                return;
            }

            const { detail } = event;
            const target = event.target as T;

            if (!target) {
                return;
            }

            if (dirByAxis[axis].includes(detail.dir)) {
                if (
                    (axis === 'x' && prevTarget.current.offsetLeft !== target.offsetLeft) ||
                    (axis === 'y' && prevTarget.current.offsetTop !== target.offsetTop)
                ) {
                    callback(target);
                }
            }

            prevTarget.current = target;

            return false;
        };

        document.body.addEventListener('navbeforefocus', spatNavCb);

        return () => {
            document.body.removeEventListener('navbeforefocus', spatNavCb);
        };
    });
};

export const useSpatNavStop = (axis: 'x' | 'y'): void => {
    React.useLayoutEffect(() => {
        const callback = (event: Event) => {
            if (!isSpatNavEvent(event)) {
                return;
            }
            const { detail } = event;
            if (dirByAxis[axis].includes(detail.dir)) {
                event.preventDefault();
            }
        };
        document.body.addEventListener('navbeforefocus', callback);

        return () => {
            document.body.removeEventListener('navbeforefocus', callback);
        };
    });
};
