import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from '@sberdevices/plasma-ui/components/Grid';
import { Headline4 } from '@sberdevices/plasma-ui/components/Typography';

import { Filler, UIStoryDecorator } from '../helpers';

export default {
    title: 'UI/Layout/Grid',
    decorators: [UIStoryDecorator],
};

const StyledHeadline4 = styled(Headline4)`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`;

const Code = styled.code`
    font-size: 0.75rem;
`;

export const Default = () => (
    <Container>
        <StyledHeadline4>Default</StyledHeadline4>
        <Row>
            <Col size={1}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=1</Code>
                </Filler>
            </Col>
            <Col size={2}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=2</Code>
                </Filler>
            </Col>
            <Col size={3}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=3</Code>
                </Filler>
            </Col>
            <Col size={4}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=4</Code>
                </Filler>
            </Col>
        </Row>
        <Row>
            <Col size={3} offset={1}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=3, offset=1</Code>
                </Filler>
            </Col>
            <Col size={6} offset={2}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=6, offset=2</Code>
                </Filler>
            </Col>
        </Row>

        <StyledHeadline4>Adaptive</StyledHeadline4>
        <Row>
            <Col sizeS={1} sizeM={2} sizeL={3} sizeXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>sizeS=1, sizeM=2, sizeL=3, sizeXL=3</Code>
                </Filler>
            </Col>
            {/* Допустимо указывать fallback-значение ширины для остальных разрешений */}
            <Col size={2} sizeXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=2, sizeXL=4</Code>
                </Filler>
            </Col>
        </Row>
        <Row>
            <Col size={3} offsetS={1} offsetM={2} offsetL={3} offsetXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=3, offsetS=3, offsetM=2, offsetL=3, offsetXL=4</Code>
                </Filler>
            </Col>
            {/* Допустимо указывать fallback-значение отступа для остальных разрешений */}
            <Col size={6} offset={2} offsetXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=6 offset=2 offsetXL=4</Code>
                </Filler>
            </Col>
        </Row>

        <StyledHeadline4>Calculatable</StyledHeadline4>
        <Row>
            <Col type="calc" size={1}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=1</Code>
                </Filler>
            </Col>
            <Col type="calc" size={2}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=2</Code>
                </Filler>
            </Col>
            <Col type="calc" size={3}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=3</Code>
                </Filler>
            </Col>
            <Col type="calc" size={4}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=4</Code>
                </Filler>
            </Col>
        </Row>
        <Row>
            <Col type="calc" size={3} offset={1}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=3, offset=1</Code>
                </Filler>
            </Col>
            <Col type="calc" size={6} offset={2}>
                <Filler style={{ marginBottom: '1rem' }}>
                    <Code>size=6, offset=2</Code>
                </Filler>
            </Col>
        </Row>
    </Container>
);
