import React from 'react';
import styled from 'styled-components';
import { accent, footnote1 } from '@sberdevices/plasma-tokens';
import { text } from '@storybook/addon-knobs';

import { Footnote1 } from '../Typography';
import { Container, Row, Col } from '../Grid';

import { TextBox, Title, BigTitle, SubTitle, Label, Caption } from './TextBox';

export default {
    title: 'Content/TextBox',
    component: TextBox,
};

const Template = (args) => <TextBox {...args} />;
const T = () => Template.bind({});

export const Default = T();
Default.args = {
    // label: 'Label',
    title: 'Title',
    subTitle: 'Subtitle',
    // caption: 'Caption',
};

const Variation = styled(Footnote1)`
    position: absolute;
    top: -1.5em;
    left: 0;

    color: ${accent};
`;

const Example = styled.div`
    position: relative;
    border: 1px dotted ${accent};

    font-size: ${footnote1.fontSize};
    padding: 1em;
    margin: 1.5em 0;
`;

export const Variations = () => {
    const titleText = text('Title', 'Title');
    const subTitleText = text('SubTitle', 'SubTitle');
    const labelText = text('Label', 'Label');
    const captionText = text('Caption', 'Caption');
    const bigTitleText = text('BigTitle', 'BigTitle');

    return (
        <Container>
            <Row>
                <Col size={3}>
                    <Example>
                        <Variation>Title+Subtitle</Variation>
                        <TextBox>
                            <Title>{titleText}</Title>
                            <SubTitle>{subTitleText}</SubTitle>
                        </TextBox>
                    </Example>
                </Col>
            </Row>
            <Row>
                <Col size={3}>
                    <Example>
                        <Variation>Title+Subtitle+Caption</Variation>
                        <TextBox>
                            <Title>{titleText}</Title>
                            <SubTitle>{subTitleText}</SubTitle>
                            <Caption>{captionText}</Caption>
                        </TextBox>
                    </Example>
                </Col>
            </Row>
            <Row>
                <Col size={3}>
                    <Example>
                        <Variation>Label+Title</Variation>
                        <TextBox label={labelText} title={titleText} />
                    </Example>
                </Col>
            </Row>
            <Row>
                <Col size={3}>
                    <Example>
                        <Variation>Label+BigTitle</Variation>
                        <TextBox>
                            <Label>{labelText}</Label>
                            <BigTitle>{bigTitleText}</BigTitle>
                        </TextBox>
                    </Example>
                </Col>
            </Row>
            <Row>
                <Col size={3}>
                    <Example>
                        <Variation>Caption+Title</Variation>
                        <TextBox>
                            <Caption>{captionText}</Caption>
                            <Title>{titleText}</Title>
                        </TextBox>
                    </Example>
                </Col>
            </Row>
            <Row>
                <Col size={3}>
                    <Example>
                        <Variation>BigTitle+Subtitle</Variation>
                        <TextBox size="l" title={bigTitleText} subTitle={subTitleText} />
                    </Example>
                </Col>
            </Row>
            <Row>
                <Col size={3}>
                    <Example>
                        <Variation>Laber+Title+Subtitle</Variation>
                        <TextBox label={labelText} title={titleText} subTitle={subTitleText} />
                    </Example>
                </Col>
            </Row>
        </Container>
    );
};
