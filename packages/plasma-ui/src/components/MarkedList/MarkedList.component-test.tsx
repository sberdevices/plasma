import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';
import { IconDone, IconLock } from '@sberdevices/plasma-icons';
import { accent, primary, tertiary } from '@sberdevices/plasma-tokens';

describe('plasma-ui: MarkedList', () => {
    const MarkedList = getComponent('MarkedList');
    const MarkedItem = getComponent('MarkedItem');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
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
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
