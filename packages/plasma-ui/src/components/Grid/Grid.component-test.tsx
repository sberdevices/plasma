import React from 'react';
import styled from 'styled-components';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

const Filler = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.5rem 1rem;
    background-color: rgba(255, 255, 255, 0.06);
`;

describe('plasma-ui: Grid', () => {
    const Container = getComponent('Container');
    const Row = getComponent('Row');
    const Col = getComponent('Col');

    it('Coll_type_calc', () => {
        mount(
            <CypressTestDecorator>
                <Container>
                    <Row>
                        <Col type="calc" size={1}>
                            <Filler>1</Filler>
                        </Col>
                        <Col type="calc" size={4}>
                            <Filler>4</Filler>
                        </Col>
                        <Col type="calc" size={2}>
                            <Filler>2</Filler>
                        </Col>
                    </Row>
                    <Row>
                        <Col type="calc" size={3} offset={1}>
                            <Filler>3 offset 1</Filler>
                        </Col>
                        <Col type="calc" size={6} offset={2}>
                            <Filler>6 offset 2</Filler>
                        </Col>
                    </Row>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
