import React, { useMemo } from 'react';

import { TabsContainer, TabsContainerProps } from './TabsContainer';
import { TabItemAnimated } from './TabItem';
import { TabItemRefs, TabsContext } from './TabsContext';
import { TabsSlider } from './TabsSlider';

interface AnimatedProps {
    animated: true;
    index: number;
}

interface UnAnimatedProps {
    animated?: never;
    index?: never;
}

export type TabsProps = (AnimatedProps | UnAnimatedProps) & TabsContainerProps;

const isAnimatedProps = (props: TabsProps): props is AnimatedProps & TabsContainerProps => {
    return props.animated === true;
};

/**
 * Контейнер вкладок со слайдером
 */
export const Tabs: React.FC<TabsProps> = ({ children, ...props }) => {
    const refs = useMemo(() => new TabItemRefs(), []);

    if (!isAnimatedProps(props)) {
        return <TabsContainer {...props}>{children}</TabsContainer>;
    }

    const { index, animated, ...rest } = props;
    const childrenArray = React.Children.toArray(children);
    const animatedChildren = childrenArray.map((child, i) => {
        if (React.isValidElement(child)) {
            return <TabItemAnimated key={i} {...child.props} />;
        }
        return child;
    });

    return (
        <TabsContext.Provider value={{ refs, animated }}>
            <TabsContainer {...rest}>
                {animatedChildren}
                <TabsSlider index={index} />
            </TabsContainer>
        </TabsContext.Provider>
    );
};
