import React from 'react';
import { Tabs, TabItem } from '@sberdevices/plasma-b2c';

import { B2CTabsShowcase, IconPlaceholder, B2CStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'B2C/Controls/Tabs',
    component: Tabs,
    decorators: [B2CStoryDecorator, InSpacingDecorator],
};

const rows = {
    Secondary: { view: 'secondary' },
    Clear: { view: 'clear' },
    Disabled: { disabled: true },
    Pilled: { pilled: true },
    PilledStretch: { pilled: true, stretch: true },
    PilledStretchClear: { pilled: true, stretch: true, view: 'clear' },
};
const cols = {
    Text: [{}, { children: 'Label' }],
    TextIcon: [{}, { children: 'Label', contentLeft: <IconPlaceholder /> }],
    Icon: [{}, { contentLeft: <IconPlaceholder /> }],
};

export const Default = () => <B2CTabsShowcase rows={rows} cols={cols} list={Tabs} item={TabItem} />;
