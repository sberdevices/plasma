import React from 'react';
import styled from 'styled-components';
import { mount, CypressTestDecorator, PadMe, getComponent } from '@sberdevices/plasma-cy-utils';

const Item = styled.div`
    width: 100%;
    height: 100px;
    background-color: #999;
    border-radius: 10px;
`;

const items = [
    { id: 0, label: '0' },
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 3, label: '3' },
    { id: 4, label: '4' },
];

describe('ElasticGrid', () => {
    const ElasticGrid = getComponent('ElasticGrid');

    before(() => {
        cy.on('uncaught:exception', (err) => {
            if (err.toString().match(/ResizeObserver loop limit exceeded/)) {
                return false;
            }
        });
    });

    it('_view', () => {
        mount(
            <CypressTestDecorator>
                <ElasticGrid minColWidth={125} gapX={8} gapY={8}>
                    {items.map((item) => (
                        <Item key={item.id}>{item.label}</Item>
                    ))}
                </ElasticGrid>
                <PadMe />
                <ElasticGrid minColWidth={125}>
                    {items.map((item) => (
                        <Item key={item.id}>{item.label}</Item>
                    ))}
                </ElasticGrid>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
