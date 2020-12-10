import React from 'react';
import { IconDone, IconLock } from '@sberdevices/plasma-icons';
import { accent, whitePrimary, whiteTertiary } from '@sberdevices/plasma-tokens';

import { MarkedList, MarkedItem } from '.';

export default {
    title: 'MarkedList',
    component: MarkedList,
};

export const Default = () => (
    <MarkedList>
        <MarkedItem text="Музыка без ограничений" style={{ color: whitePrimary }}>
            <IconDone size="xs" color={accent} />
        </MarkedItem>
        <MarkedItem text="Ежедневные рекомендации" style={{ color: whitePrimary }}>
            <IconDone size="xs" color={accent} />
        </MarkedItem>
        <MarkedItem text="Коллекции и плейлисты" style={{ color: whiteTertiary }}>
            <IconLock size="xs" color={whiteTertiary} />
        </MarkedItem>
        <MarkedItem text="Без рекламы" style={{ color: whiteTertiary }}>
            <IconLock size="xs" color={whiteTertiary} />
        </MarkedItem>
    </MarkedList>
);
