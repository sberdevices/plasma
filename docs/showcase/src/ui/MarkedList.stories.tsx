import React from 'react';
import { accent, primary, tertiary } from '@sberdevices/plasma-tokens';
import { MarkedList, MarkedItem } from '@sberdevices/ui/components/MarkedList';

import { IconPlaceholder, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Content/MarkedList',
    component: MarkedList,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

export const Default = () => (
    <MarkedList>
        <MarkedItem text="Музыка без ограничений" style={{ color: primary }}>
            <IconPlaceholder color={accent} />
        </MarkedItem>
        <MarkedItem text="Ежедневные рекомендации" style={{ color: primary }}>
            <IconPlaceholder color={accent} />
        </MarkedItem>
        <MarkedItem text="Коллекции и плейлисты" style={{ color: tertiary }}>
            <IconPlaceholder />
        </MarkedItem>
        <MarkedItem text="Без рекламы" style={{ color: tertiary }}>
            <IconPlaceholder />
        </MarkedItem>
    </MarkedList>
);
