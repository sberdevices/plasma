import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: Tabs', () => {
    const Tabs = getComponent('Tabs');
    const TabItem = getComponent('TabItem');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Tabs>
                    <TabItem>Joy</TabItem>
                    <TabItem isActive>Sber</TabItem>
                    <TabItem>Eva</TabItem>
                </Tabs>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
