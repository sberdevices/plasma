import React from 'react';
import styled from 'styled-components';

import { Container, Row, Col } from './Grid';
import { Filler } from '../../helpers/Filler';

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

export const Default = () => (
    <Container>
        <Row>
            <Col>
                <Filler>1</Filler>
            </Col>
            <Col size={2}>
                <Filler>2</Filler>
            </Col>
            <Col size={3}>
                <Filler>3</Filler>
            </Col>
            <Col size={4}>
                <Filler>4</Filler>
            </Col>
            <Col size={2}>
                <Filler>2</Filler>
            </Col>
        </Row>
        <Row>
            <Col size={3} offset={1}>
                <Filler>3 offset 1</Filler>
            </Col>
            <Col size={6} offset={2}>
                <Filler>6 offset 2</Filler>
            </Col>
        </Row>
    </Container>
);
