import React, { useState } from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';
import styled from 'styled-components';

const items = [{ label: 'Joy' }, { label: 'Sber' }, { label: 'Athena' }];

describe('plasma-ui: Tabs', () => {
    const withAutoFocus = getComponent('withAutoFocus');
    const addFocus = getComponent('addFocus');

    const Tabs = getComponent('Tabs');
    const TabItem = getComponent('TabItem');
    const AutoFocusTabItem = withAutoFocus(TabItem);

    const StyledTabItem = styled(TabItem)`
        ${addFocus({
            outlineColor: 'red',
            outlineRadius: '1.125rem',
        })}
    `;

    const ControlledTabs = () => {
        const [index, setIndex] = useState(0);

        return (
            <Tabs id="tabs" animated index={index} forwardedAs="ul">
                {items.map((item, i) => (
                    <TabItem key={i} forwardedAs="li" isActive={index === i} onClick={() => setIndex(2)}>
                        {item.label}
                    </TabItem>
                ))}
            </Tabs>
        );
    };

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
                <Tabs size="m" forwardedAs="ul">
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

    it('_pilled', () => {
        mount(
            <CypressTestDecorator>
                <Tabs pilled forwardedAs="ul">
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

    it('_shifts', () => {
        const Helper = () => <div style={{ width: '50px', height: '50px', background: 'red' }} />;

        mount(
            <CypressTestDecorator>
                <div style={{ display: 'flex' }}>
                    <Helper />
                    <Tabs shiftLeft forwardedAs="ul">
                        {items.map((item, i) => (
                            <TabItem key={i} isActive={i === 1} forwardedAs="li">
                                {item.label}
                            </TabItem>
                        ))}
                    </Tabs>
                </div>

                <div style={{ display: 'flex' }}>
                    <Tabs shiftRight forwardedAs="ul">
                        {items.map((item, i) => (
                            <TabItem key={i} isActive={i === 1} forwardedAs="li">
                                {item.label}
                            </TabItem>
                        ))}
                    </Tabs>
                    <Helper />
                </div>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('item autoFocus', () => {
        mount(
            <CypressTestDecorator>
                <Tabs>
                    {items.map((item, i) => (
                        <AutoFocusTabItem key={i} isActive={i === 1} autoFocus={i === 1}>
                            {item.label}
                        </AutoFocusTabItem>
                    ))}
                </Tabs>
            </CypressTestDecorator>,
        );

        cy.get('div > button:nth-child(2)').focus();
        cy.matchImageSnapshot();
    });

    it('item autoFocus with pilled', () => {
        mount(
            <CypressTestDecorator>
                <Tabs pilled>
                    {items.map((item, i) => (
                        <AutoFocusTabItem key={i} isActive={i === 1} autoFocus={i === 1}>
                            {item.label}
                        </AutoFocusTabItem>
                    ))}
                </Tabs>
            </CypressTestDecorator>,
        );

        cy.get('div > button:nth-child(2)').focus();
        cy.matchImageSnapshot();
    });

    // Данный тест должен обязательно идти после проверки на autoFocus,
    // иначе фокус в предыдущих двух не будет работать
    it('item add styled focus', () => {
        function Demo() {
            const [index, setIndex] = React.useState(1);

            return (
                <Tabs>
                    {items.map((item, i) => (
                        <StyledTabItem key={i} isActive={i === index} onClick={() => setIndex(i)}>
                            {item.label}
                        </StyledTabItem>
                    ))}
                </Tabs>
            );
        }

        mount(
            <CypressTestDecorator>
                <Demo />
            </CypressTestDecorator>,
        );

        cy.get('div > button:nth-child(2)').focus();
        cy.get('div > button:nth-child(1)').focus().click({ force: true });

        cy.matchImageSnapshot();
    });

    it('_animated', () => {
        mount(
            <CypressTestDecorator>
                <ControlledTabs />
            </CypressTestDecorator>,
        );

        cy.get('ul > li:nth-child(2)').click();
        cy.matchImageSnapshot();
    });
});
