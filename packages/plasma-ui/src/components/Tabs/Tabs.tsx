import React, { forwardRef, useMemo } from 'react';
import type { TabItemProps, TabsProps as BaseProps } from '@sberdevices/plasma-core';

import { TabsView, TabsViewProps } from './TabsView';
import { TabItem } from './TabItem';
import { TabItemRefs, TabsAnimationContext } from './TabsAnimationContext';
import { TabsSlider } from './TabsSlider';

interface AnimatedProps {
    animated?: true;
    index?: number;
}

interface UnAnimatedProps {
    animated?: false;
    index?: never;
}

export type TabsProps = (AnimatedProps | UnAnimatedProps) & BaseProps & TabsViewProps;

const isAnimatedProps = (props: TabsProps): props is AnimatedProps & TabsViewProps => {
    return props.animated === true;
};

/**
 * Контейнер вкладок со слайдером
 */
// eslint-disable-next-line prefer-arrow-callback
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs({ children, ...props }, ref) {
    const refs = useMemo(() => new TabItemRefs(), []);

    if (!isAnimatedProps(props)) {
        return (
            <TabsView ref={ref} {...props}>
                {children}
            </TabsView>
        );
    }

    const { index, ...rest } = props;
    const childrenArray = React.Children.toArray(children);
    const animatedChildren = childrenArray.map((child, i) => {
        if (React.isValidElement<TabItemProps>(child)) {
            return <TabItem animated key={i} {...child.props} />;
        }
        return child;
    });

    return (
        <TabsAnimationContext.Provider value={{ refs }}>
            <TabsView ref={ref} {...rest}>
                {animatedChildren}
                <TabsSlider index={index} />
            </TabsView>
        </TabsAnimationContext.Provider>
    );
});
