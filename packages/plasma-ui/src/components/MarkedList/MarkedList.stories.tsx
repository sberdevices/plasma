import React from 'react';
import { IconDone, IconLock } from '@sberdevices/plasma-icons';
import { accent, primary, tertiary } from '@sberdevices/plasma-tokens';

import { InSpacing } from '../../helpers/StoryDecorators';

import { MarkedList, MarkedItem } from '.';

export default {
    title: 'Content/MarkedList',
    component: MarkedList,
    decorators: [InSpacing],
};

export const Default = () => (
    <MarkedList>
        <MarkedItem text="Музыка без ограничений" style={{ color: primary }}>
            <IconDone size="xs" color={accent} />
        </MarkedItem>
        <MarkedItem text="Ежедневные рекомендации" style={{ color: primary }}>
            <IconDone size="xs" color={accent} />
        </MarkedItem>
        <MarkedItem text="Коллекции и плейлисты" style={{ color: tertiary }}>
            <IconLock size="xs" color={tertiary} />
        </MarkedItem>
        <MarkedItem text="Без рекламы" style={{ color: tertiary }}>
            <IconLock size="xs" color={tertiary} />
        </MarkedItem>
    </MarkedList>
);
