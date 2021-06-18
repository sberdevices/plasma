import React from 'react';
import { Filler } from '@sberdevices/plasma-sb-utils';

import { Container, Row, Col } from '.';

export const Default = () => (
    <Container>
        <Row>
            <Col sizeS={1} sizeM={2} sizeL={3} sizeXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>1</Filler>
            </Col>
            {/* Допустимо указывать fallback-значение ширины для остальных разрешений */}
            <Col size={2} sizeXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>2</Filler>
            </Col>
        </Row>
        <Row>
            <Col size={3} offsetS={1} offsetM={2} offsetL={3} offsetXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>3 offset 1</Filler>
            </Col>
            {/* Допустимо указывать fallback-значение отступа для остальных разрешений */}
            <Col size={6} offset={2} offsetXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>6 offset 2</Filler>
            </Col>
        </Row>
    </Container>
);
