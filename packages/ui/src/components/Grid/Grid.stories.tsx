import React from 'react';
import styled from 'styled-components';
import { text, number } from '@storybook/addon-knobs';

import { Filler } from '../../helpers/Filler';

import { Container, Row, Col } from './Grid';

const StyledDummyFiller = styled(Filler)`
    opacity: 0.5;
`;

export default {
    title: 'Grid',
};

export const ColPlayground = () => {
    const size = number('Dummy size', 1);
    const items = Array(number('Dummy columns', 12)).fill(0);
    return (
        <Container>
            <Row>
                {items.map((_, i) => (
                    <Col key={`item:${i}`} size={size}>
                        <StyledDummyFiller>Dummy</StyledDummyFiller>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col size={number('Size', 4)} offset={number('Offset', 0)}>
                    <Filler>{text('Content', 'Content')}</Filler>
                </Col>
            </Row>
        </Container>
    );
};
