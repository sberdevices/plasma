import React, { forwardRef, ReactNode, useMemo, useCallback, FunctionComponent } from 'react';

import { TabItemRefs, TabsContext } from './TabsContext';
import { Tabs, TabsProps } from './Tabs';
import { TabItem, TabItemProps } from './TabItem';

export interface TabsControllerProps extends TabsProps {
    items: Array<{ label: string; contentLeft?: ReactNode }>;
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
 * Функция для создания `TabController`, которая дает возможность
 * кастомизировать стили, при этом сохраняя единый интерфейс и функционал.
 */
export function createTabsController<T extends HTMLDivElement, P extends TabsControllerProps>(
    ListComponent = Tabs,
    ItemComponent: FunctionComponent<TabItemProps> = TabItem,
) {
    // eslint-disable-next-line prefer-arrow-callback
    return forwardRef<T, P>(function TabsController({ disabled, items, index, onIndexChange, ...rest }, ref) {
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

        const onKeyDown = useCallback(
            (event: KeyboardEvent) => {
                const minIndex = 0;
                const maxIndex = refs.items.length - 1;
                let nextIndex;

                switch (event.keyCode) {
                    case Keys.end:
                        nextIndex = maxIndex;
                        break;
                    case Keys.left:
                        nextIndex = index > minIndex ? index - 1 : index;
                        break;
                    case Keys.right:
                        nextIndex = index < maxIndex ? index + 1 : index;
                        break;
                    case Keys.home:
                        nextIndex = minIndex;
                        break;
                    default:
                        return;
                }

                if (nextIndex !== index) {
                    event.preventDefault();
                    refs.items[nextIndex].current?.focus();
                }
            },
            [index, onIndexChange],
        );

        return (
            <TabsContext.Provider value={{ refs }}>
                <ListComponent ref={ref} onKeyDown={onKeyDown} {...rest}>
                    {items.map(({ label, contentLeft }, i) => (
                        <ItemComponent
                            key={i}
                            isActive={i === index}
                            tabIndex={!disabled && i === index ? 0 : -1}
                            contentLeft={contentLeft}
                            onClick={() => !disabled && onIndexChange?.(i)}
                            onFocus={onItemFocus}
                        >
                            {label}
                        </ItemComponent>
                    ))}
                </ListComponent>
            </TabsContext.Provider>
        );
    });
}
