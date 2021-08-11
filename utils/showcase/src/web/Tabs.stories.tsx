import React from 'react';
import { Tabs, TabItem } from '@sberdevices/plasma-web/components/Tabs';

import { TabsShowcase, InSpacingDecorator, WebStoryDecorator, IconPlaceholder } from '../helpers';

export default {
    title: 'Web/Controls/Tabs',
    component: Tabs,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const sizes = { l: 60 };
const rows = {
    One: {},
    Two: {},
    Three: {},
};
const cols = {
    Normal: [{ stretch: true }, { children: 'Label' }],
    Disabled: [{ stretch: true, disabled: true }, { children: 'Label' }],
    Auto: [{}, { children: 'Label' }],
    AutoIcon: [{}, { children: <IconPlaceholder /> }],
};

export const Default = () => <TabsShowcase sizes={sizes} rows={rows} cols={cols} list={Tabs} item={TabItem} />;
