import React, { useMemo } from 'react';

import { TabsContainer, TabsContainerProps } from './TabsContainer';
import { TabItemRefs, TabsContext } from './TabsContext';
import { TabsSlider } from './TabsSlider';

export interface TabsProps extends TabsContainerProps {
    activeIndex?: number;
}

/**
 * Контейнер вкладок со слайдером
 */
export const Tabs: React.FC<TabsProps> = ({ children, activeIndex, ...rest }) => {
    const refs = useMemo(() => new TabItemRefs(), []);
    const hasAnimation = activeIndex !== undefined;
    return (
        <TabsContext.Provider value={{ refs, hasAnimation }}>
            <TabsContainer {...rest}>
                {children}
                {activeIndex !== undefined && <TabsSlider activeIndex={activeIndex} />}
            </TabsContainer>
        </TabsContext.Provider>
    );
};
