import React from 'react';

import { ActionButtonSelector } from '../ProductActionButton/ProductActionButton';
import { RemoteKey, useRemoteListener, useThrottledCallback } from '../../../hooks';
import { getScreenScrollBreakpoints } from '../../../utils/getScreenScrollBreakpoints';
import { isElementOutViewport } from '../../../utils/isElementOutViewport';

export const useScrollByBreakpoints = (breakpointRefs: React.RefObject<HTMLDivElement | null>[]) => {
    const scrollableContainerRef = React.useRef<HTMLDivElement>(null);
    const [breakpointsOffsetTop, setBreakpointsOffsetTop] = React.useState<number[]>([]);

    React.useEffect(() => {
        const offsets = breakpointRefs
            .filter((breakpointRef) => breakpointRef.current)
            .map((breakpointRef) => (breakpointRef.current as HTMLDivElement).offsetTop);

        setBreakpointsOffsetTop(offsets);
    }, []);

    const calculatedBreakpointsOffsetTop = React.useMemo(
        () => getScreenScrollBreakpoints(breakpointsOffsetTop, scrollableContainerRef?.current?.offsetHeight || 0),
        [breakpointsOffsetTop],
    );

    const remoteListenerHandler = useThrottledCallback(
        (key: RemoteKey) => {
            const scrollableContainer = scrollableContainerRef.current;

            if (
                !scrollableContainer ||
                (!scrollableContainer.contains(document.activeElement) && document.activeElement !== document.body)
            ) {
                return;
            }

            const currentTopScroll = scrollableContainer.scrollTop;

            switch (key) {
                case 'LONG_DOWN':
                    scrollableContainer.scrollTo({ top: scrollableContainer.scrollHeight, behavior: 'smooth' });
                    break;
                case 'DOWN': {
                    const nearestBreakpoint = calculatedBreakpointsOffsetTop.find((item) => item > currentTopScroll);
                    scrollableContainer.scrollTo({
                        top: nearestBreakpoint,
                        behavior: 'smooth',
                    });
                    break;
                }
                case 'UP': {
                    const nearestBreakpoint = calculatedBreakpointsOffsetTop
                        .filter((item) => item < currentTopScroll)
                        .pop();
                    scrollableContainer.scrollTo({
                        top: nearestBreakpoint,
                        behavior: 'smooth',
                    });
                    break;
                }
                case 'LONG_UP':
                    scrollableContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                default:
            }
        },
        [calculatedBreakpointsOffsetTop],
        350,
    );

    useRemoteListener(remoteListenerHandler, {});

    React.useEffect(() => {
        const scrollableContainer = scrollableContainerRef.current;

        if (!scrollableContainer) {
            return;
        }

        const handleFocus = (event: Event) => {
            const target = event.target as HTMLElement;
            const { scrollHeight, scrollTop, offsetHeight } = scrollableContainer;
            const currentOffset = scrollTop + offsetHeight;

            if (scrollableContainer.contains(target)) {
                event.stopPropagation();
                event.preventDefault();

                // Если контент не проскролен и фокус пришел из вне контейнера, пытаемся сфокусироваться на actionButton
                if (scrollTop === 0 && !scrollableContainer.contains(document.activeElement)) {
                    const actionButton = scrollableContainer.querySelector(
                        `[data-name="${ActionButtonSelector.ActionButton}"]`,
                    ) as HTMLElement;

                    if (actionButton) {
                        actionButton.focus();
                    }
                } else if (!isElementOutViewport(target)) {
                    // Фоксируем элемент только во вьюпорте
                    target.focus({ preventScroll: true });
                }
            } else if (scrollTop !== 0 || currentOffset >= scrollHeight) {
                // Можем фокусироваться на элементах вне скролируемого контейнера
                // только когда проскролили контейнер полностью вверх, либо вниз
                event.stopPropagation();
                event.preventDefault();
            }
        };

        document.addEventListener('focus', handleFocus, true);
        document.addEventListener('navbeforefocus', handleFocus, true);

        return () => {
            document.removeEventListener('focus', handleFocus);
            document.removeEventListener('navbeforefocus', handleFocus);
        };
    }, []);

    return scrollableContainerRef;
};
