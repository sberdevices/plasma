import React, { useMemo, useEffect, useRef } from 'react';
import type { AsProps } from '@sberdevices/plasma-core';

import { TabsContainer, TabsContainerProps } from './TabsContainer';
import { TabItem, TabItemProps } from './TabItem';
import { TabItemRefs, TabsContext, useTabsContext } from './TabsContext';
import { TabsSlider } from './TabsSlider';

interface AnimatedProps {
    animated: true;
    index: number;
}

interface UnAnimatedProps {
    animated?: never;
    index?: never;
}

export type TabsProps = (AnimatedProps | UnAnimatedProps) &
    TabsContainerProps &
    AsProps &
    React.HTMLAttributes<HTMLUListElement>;

const isAnimatedProps = (props: TabsProps): props is AnimatedProps & TabsContainerProps => {
    return props.animated === true;
};

const TabItemAnimated: React.FC<TabItemProps> = ({ children, ...rest }) => {
    const itemRef = useRef<HTMLElement>(null);

    const { refs, animated } = useTabsContext();

    useEffect(() => {
        refs?.register(itemRef);
        return () => refs?.unregister(itemRef);
    }, [refs]);

    return (
        <TabItem ref={itemRef} animated={animated} {...rest}>
            {children}
        </TabItem>
    );
};

/**
 * Контейнер вкладок со слайдером
 */
export const Tabs: React.FC<TabsProps> = ({ children, ...rest }) => {
    const refs = useMemo(() => new TabItemRefs(), []);

    if (!isAnimatedProps(rest)) {
        return <TabsContainer {...rest}>{children}</TabsContainer>;
    }

    const { index } = rest;

    const childrenArray = React.Children.toArray(children);
    const animatedChildren = childrenArray.map((child, i) => {
        if (React.isValidElement(child)) {
            return <TabItemAnimated key={i} {...child.props} />;
        }
        return child;
    });

    return (
        <TabsContext.Provider value={{ refs, animated: true }}>
            <TabsContainer {...rest}>
                {animatedChildren}
                <TabsSlider activeIndex={index} />
            </TabsContainer>
        </TabsContext.Provider>
    );
};
