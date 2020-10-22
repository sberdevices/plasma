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
    decorators: [
        (Story) => (
            <div style={{ margin: '0 -1em' }}>
                <Story />
            </div>
        ),
    ],
};

export const ColPlayground = () => (
    <Container>
        <Row>
            <Col size={4}>
                <StyledDummyFiller>Dummy</StyledDummyFiller>
            </Col>
        </Row>
        <Row>
            <Col size={3}>
                <StyledDummyFiller>Dummy</StyledDummyFiller>
            </Col>
            <Col size={1}>
                <StyledDummyFiller>Dummy</StyledDummyFiller>
            </Col>
        </Row>
        <Row>
            <Col size={2}>
                <StyledDummyFiller>Dummy</StyledDummyFiller>
            </Col>
            <Col size={2}>
                <StyledDummyFiller>Dummy</StyledDummyFiller>
            </Col>
        </Row>
        <Row>
            <Col size={1}>
                <StyledDummyFiller>Dummy</StyledDummyFiller>
            </Col>
            <Col size={3}>
                <StyledDummyFiller>Dummy</StyledDummyFiller>
            </Col>
        </Row>
        <Row>
            <Col size={number('Size', 1)} offset={number('Offset', 0)}>
                <Filler>{text('Content', 'Content')}</Filler>
            </Col>
        </Row>
    </Container>
);
