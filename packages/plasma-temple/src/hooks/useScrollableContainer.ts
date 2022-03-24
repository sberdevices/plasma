import React from 'react';

import { scroll } from '../utils';

type GetPositionParams = {
    element: HTMLElement;
    container: HTMLElement;
    containerRect: DOMRect;
    diffMultiplier: number;
};

const getPositionY = ({ element, container, containerRect, diffMultiplier }: GetPositionParams) => {
    const elementRect = element.getBoundingClientRect();
    const currentScrollTop = container.scrollTop;
    const maxScrollTop = container.scrollHeight - container.offsetHeight;
    const isCenter = elementRect.height * 3 > containerRect.height;
    const defaultDiff = isCenter
        ? (containerRect.height - elementRect.height) / 2
        : elementRect.height * diffMultiplier;

    if (elementRect.top - defaultDiff - containerRect.top < elementRect.height) {
        if (elementRect.top < 0) {
            const diff = defaultDiff + (Math.abs(elementRect.top) + containerRect.top);

            return {
                top: Math.max(currentScrollTop - diff, 0),
            };
        }

        const diff = defaultDiff + (containerRect.top - elementRect.top);

        return {
            top: Math.max(currentScrollTop - diff, 0),
        };
    }

    if (containerRect.bottom - elementRect.bottom - defaultDiff < 0) {
        const diff = defaultDiff + (elementRect.bottom - containerRect.bottom);

        return {
            top: Math.min(currentScrollTop + diff, maxScrollTop),
        };
    }

    return { top: currentScrollTop };
};

export const useScrollableContainer = () => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const containerRect = React.useRef<DOMRect | null>(null);

    const handleFocus = React.useCallback((event: Event) => {
        if (event.target && scrollContainerRef.current) {
            if (!containerRect.current) {
                containerRect.current = scrollContainerRef.current.getBoundingClientRect();
            }

            const target = event.target as HTMLElement;

            const position = getPositionY({
                element: target,
                container: scrollContainerRef.current,
                containerRect: containerRect.current,
                diffMultiplier: 1.5,
            });

            scroll({
                element: scrollContainerRef.current,
                startPosition: scrollContainerRef.current.scrollTop,
                offset: position.top - scrollContainerRef.current.scrollTop,
                duration: 300,
                axis: 'y',
            });
        }
    }, []);

    React.useEffect(() => {
        if (!scrollContainerRef.current) {
            return;
        }

        if (!containerRect.current) {
            containerRect.current = scrollContainerRef.current.getBoundingClientRect();
        }

        // eslint-disable-next-line no-underscore-dangle
        if (window && window.__spatialNavigation__) {
            scrollContainerRef.current?.addEventListener('navbeforefocus', handleFocus, true);
        } else {
            scrollContainerRef.current.addEventListener('focus', handleFocus, true);
        }

        return () => {
            scrollContainerRef.current?.removeEventListener('focus', handleFocus);
            scrollContainerRef.current?.removeEventListener('navbeforefocus', handleFocus);
        };
    }, []);

    return scrollContainerRef;
};
