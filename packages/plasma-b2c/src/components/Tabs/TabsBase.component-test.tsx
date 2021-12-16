import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

const items = [{ label: 'Joy' }, { label: 'Sber' }, { label: 'Athena' }];

describe('plasma-b2c: Tabs', () => {
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

    it('_size', () => {
        mount(
            <CypressTestDecorator>
                <Tabs size="s" forwardedAs="ul">
                    {items.map((item, i) => (
                        <TabItem key={i} isActive={i === 1} forwardedAs="li">
                            {item.label}
                        </TabItem>
                    ))}
                </Tabs>
                <Tabs size="l" forwardedAs="ul">
                    {items.map((item, i) => (
                        <TabItem key={i} isActive={i === 1} forwardedAs="li">
                            {item.label}
                        </TabItem>
                    ))}
                </Tabs>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
