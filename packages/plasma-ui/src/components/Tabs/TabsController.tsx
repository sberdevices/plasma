import { createTabsController, TabsControllerProps as BaseProps } from '@sberdevices/plasma-core';

import { Tabs, TabsProps } from './Tabs';
import { TabItem } from './TabItem';

export type TabsControllerProps = BaseProps & TabsProps;

/**
 * Контроллер вкладок.
 * Позволяет использовать клавиши ArrowLeft, ArrowRight, Home, End для навигации по вкладкам.
 */
export const TabsController = createTabsController(Tabs, TabItem);
