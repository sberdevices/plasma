import React, { ReactNode, useRef, useMemo, useCallback, useEffect } from 'react';

import { TabItemRefs, TabsContext } from './TabsContext';
import { Tabs, TabsProps } from './Tabs';
import { TabItem } from './TabItem';

export interface TabsControllerProps extends TabsProps {
    items: Array<{ label: string; contentLeft: ReactNode }>;
    index: number;
    onIndexChange: (index: number) => void;
    children?: never;
}

enum Keys {
    end = 35,
    home = 36,
    left = 37,
    right = 39,
}

/**
 * Контроллер вкладок.
 * Позволяет использовать клавиши ArrowLeft, ArrowRight, Home, End для навигации по вкладкам.
 */
export const TabsController: React.FC<TabsControllerProps> = ({ stretch, disabled, items, index, onIndexChange }) => {
    const listRef = useRef<HTMLDivElement>(null);
    const refs = useMemo(() => new TabItemRefs(), []);

    const onItemFocus = useCallback(
        (event) => {
            const focusIndex = refs.items.findIndex((itemRef) => itemRef.current === event.target);

            if (focusIndex !== index) {
                onIndexChange?.(focusIndex);
            }
        },
        [refs, index, onIndexChange],
    );

    useEffect(() => {
        const onKeyup = (event: KeyboardEvent) => {
            const focusIndex = refs.items.findIndex((itemRef) => itemRef.current === document.activeElement);
            const minIndex = 0;
            const maxIndex = refs.items.length - 1;
            let nextIndex;

            switch (event.keyCode) {
                case Keys.end:
                    nextIndex = maxIndex;
                    break;
                case Keys.left:
                    nextIndex = focusIndex > minIndex ? focusIndex - 1 : maxIndex;
                    break;
                case Keys.right:
                    nextIndex = focusIndex < maxIndex ? focusIndex + 1 : minIndex;
                    break;
                case Keys.home:
                    nextIndex = minIndex;
                    break;
                default:
                    return;
            }

            event.preventDefault();
            refs.items[nextIndex].current?.focus();
        };

        if (listRef.current) {
            listRef.current.addEventListener('keyup', onKeyup);
        }
        return () => {
            if (listRef.current) {
                listRef.current.removeEventListener('keyup', onKeyup);
            }
        };
    }, [refs]);

    return (
        <TabsContext.Provider value={{ refs }}>
            <Tabs ref={listRef} stretch={stretch}>
                {items.map(({ label, contentLeft }, i) => (
                    <TabItem
                        key={i}
                        isActive={i === index}
                        tabIndex={!disabled ? 0 : -1}
                        contentLeft={contentLeft}
                        onClick={() => !disabled && onIndexChange?.(i)}
                        onFocus={onItemFocus}
                    >
                        {label}
                    </TabItem>
                ))}
            </Tabs>
        </TabsContext.Provider>
    );
};
