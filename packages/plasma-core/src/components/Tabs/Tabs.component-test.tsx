import React from 'react';
import ReactDom from 'react-dom';
import { mount } from '@cypress/react';
import { CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

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
            { ReactDom },
        );

        cy.matchImageSnapshot();
    });
});
