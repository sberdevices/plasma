import React from 'react';

import { Filler } from '../../helpers/Filler';

import { Container, Row, Col } from '.';

export const Default = () => (
    <Container>
        <Row>
            <Col size={1}>
                <Filler style={{ marginBottom: '1rem' }}>1</Filler>
            </Col>
            <Col size={2}>
                <Filler style={{ marginBottom: '1rem' }}>2</Filler>
            </Col>
            <Col size={3}>
                <Filler style={{ marginBottom: '1rem' }}>3</Filler>
            </Col>
            <Col size={4}>
                <Filler style={{ marginBottom: '1rem' }}>4</Filler>
            </Col>
            <Col size={2}>
                <Filler style={{ marginBottom: '1rem' }}>2</Filler>
            </Col>
        </Row>
        <Row>
            <Col size={3} offset={1}>
                <Filler style={{ marginBottom: '1rem' }}>3 offset 1</Filler>
            </Col>
            <Col size={6} offset={2}>
                <Filler style={{ marginBottom: '1rem' }}>6 offset 2</Filler>
            </Col>
        </Row>
    </Container>
);

export const Adaptive = () => (
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

export const Calculatable = () => (
    <Container>
        <Row>
            <Col type="calc" size={1}>
                <Filler style={{ marginBottom: '1rem' }}>1</Filler>
            </Col>
            <Col type="calc" size={2}>
                <Filler style={{ marginBottom: '1rem' }}>2</Filler>
            </Col>
            <Col type="calc" size={3}>
                <Filler style={{ marginBottom: '1rem' }}>3</Filler>
            </Col>
            <Col type="calc" size={4}>
                <Filler style={{ marginBottom: '1rem' }}>4</Filler>
            </Col>
            <Col type="calc" size={2}>
                <Filler style={{ marginBottom: '1rem' }}>2</Filler>
            </Col>
        </Row>
        <Row>
            <Col type="calc" size={3} offset={1}>
                <Filler style={{ marginBottom: '1rem' }}>3 offset 1</Filler>
            </Col>
            <Col type="calc" size={6} offset={2}>
                <Filler style={{ marginBottom: '1rem' }}>6 offset 2</Filler>
            </Col>
        </Row>
    </Container>
);
