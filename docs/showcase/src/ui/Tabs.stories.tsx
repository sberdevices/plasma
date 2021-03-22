import React from 'react';
import { Tabs, TabItem } from '@sberdevices/ui/components/Tabs';

import { TabsShowcase, IconPlaceholder, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Tabs',
    component: Tabs,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const sizes = { l: 48, m: 40, s: 36 };
const rows = {
    Secondary: { view: 'secondary' },
    Black: { view: 'black' },
    Clear: { view: 'clear' },
};
const cols = {
    Normal: [{ fixedWidth: true, outlined: true }, { children: 'Label' }],
    Pilled: [{ fixedWidth: true, outlined: true, pilled: true }, { children: 'Label' }],
    Disabled: [{ fixedWidth: true, outlined: true, disabled: true }, { children: 'Label' }],
    Auto: [{ outlined: true }, { children: 'Label' }],
    AutoIcon: [{ outlined: true }, { children: <IconPlaceholder /> }],
};

export const Default = () => <TabsShowcase sizes={sizes} rows={rows} cols={cols} list={Tabs} item={TabItem} />;
