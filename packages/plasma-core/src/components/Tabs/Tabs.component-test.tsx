import React, { useState } from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';
import { IconDone } from '@sberdevices/plasma-icons';

const items = [{ label: 'Joy' }, { label: 'Sber' }, { label: 'Athena' }];

describe('plasma-core: Tabs', () => {
    const Tabs = getComponent('Tabs');
    const TabItem = getComponent('TabItem');
    const TabsController = getComponent('TabsController');

    const ControlledTabsController = () => {
        const [index, setIndex] = useState(0);

        return <TabsController items={items} index={index} onIndexChange={(i) => setIndex(i)} />;
    };

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Tabs forwardedAs="ul">
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

    it('with icon', () => {
        mount(
            <CypressTestDecorator>
                <Tabs forwardedAs="ul">
                    {items.map((item, i) => (
                        <TabItem
                            key={i}
                            isActive={i === 1}
                            forwardedAs="li"
                            contentLeft={<IconDone size="s" color="inherit" />}
                        >
                            {item.label}
                        </TabItem>
                    ))}
                </Tabs>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_disabled', () => {
        mount(
            <CypressTestDecorator>
                <Tabs disabled forwardedAs="ul">
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

    it('controller', () => {
        mount(
            <CypressTestDecorator>
                <ControlledTabsController />
            </CypressTestDecorator>,
        );

        cy.get('div > button:nth-child(2)').click();
        cy.matchImageSnapshot();
    });

    it('controller with keydown', () => {
        mount(
            <CypressTestDecorator>
                <ControlledTabsController />
            </CypressTestDecorator>,
        );

        cy.root().get('[role="tablist"]').trigger('keydown', { keyCode: 13 });
        cy.get('div > button:nth-child(1)').should('have.attr', 'tabindex', '0');

        cy.root().get('[role="tablist"]').trigger('keydown', { keyCode: 39 });
        cy.get('div > button:nth-child(2)').should('have.attr', 'tabindex', '0');

        cy.root().get('[role="tablist"]').trigger('keydown', { keyCode: 37 });
        cy.get('div > button:nth-child(1)').should('have.attr', 'tabindex', '0');

        cy.root().get('[role="tablist"]').trigger('keydown', { keyCode: 35 });
        cy.get('div > button:nth-child(3)').should('have.attr', 'tabindex', '0');

        cy.root().get('[role="tablist"]').trigger('keydown', { keyCode: 36 });
        cy.get('div > button:nth-child(1)').should('have.attr', 'tabindex', '0');
    });

    it('scrollable', () => {
        const Container = ({ children }) => {
            return <div style={{ width: '75px' }}>{children}</div>;
        };

        mount(
            <CypressTestDecorator>
                <Container>
                    <Tabs>
                        <TabItem>Joy</TabItem>
                        <TabItem isActive>Sber</TabItem>
                        <TabItem>Eva</TabItem>
                    </Tabs>
                </Container>
            </CypressTestDecorator>,
        );

        cy.get('[role="tablist"]').parent().scrollTo(500, 0);

        cy.matchImageSnapshot();
    });

    it('_stretch', () => {
        mount(
            <CypressTestDecorator>
                <Tabs stretch>
                    <TabItem>Joy</TabItem>
                    <TabItem isActive>Sber</TabItem>
                    <TabItem>Eva</TabItem>
                </Tabs>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('try click by disabled tabs', () => {
        const onIndexChange = cy.stub();

        mount(
            <CypressTestDecorator>
                <TabsController items={items} index={0} disabled onIndexChange={onIndexChange} />
            </CypressTestDecorator>,
        );

        cy.get('div > button:nth-child(2)')
            .click({ force: true })
            .then(() => {
                expect(onIndexChange).not.called;
            });

        cy.root()
            .get('[role="tablist"]')
            .trigger('keydown', { keyCode: 39 })
            .then(() => {
                expect(onIndexChange).not.called;
            });
    });
});
