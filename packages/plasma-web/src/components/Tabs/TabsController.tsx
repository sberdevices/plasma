import { createTabsController, TabsControllerProps as BaseProps } from '@sberdevices/plasma-core';

import { Tabs } from './Tabs';
import { TabItem } from './TabItem';

export interface TabsControllerProps extends BaseProps {}

/**
 * Контроллер вкладок.
 * Позволяет использовать клавиши ArrowLeft, ArrowRight, Home, End для навигации по вкладкам.
 */
export const TabsController = createTabsController(Tabs, TabItem);
