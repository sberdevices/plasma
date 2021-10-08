import React from 'react';
import styled from 'styled-components';
import { mount, CypressTestDecorator } from '@sberdevices/plasma-cy-utils';

import { ElasticGrid } from '.';

const StyledElasticGrid = styled(ElasticGrid)`
    width: 600px;
`;

const Item = styled.div`
    width: 100%;
    height: 100px;
    background-color: #999;
    border-radius: 10px;
`;

describe('ElasticGrid', () => {
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
                <StyledElasticGrid minColWidth={125} gapX={8} gapY={8}>
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </StyledElasticGrid>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
