import React from 'react';
import ReactDom from 'react-dom';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';
import { accent } from '@sberdevices/plasma-tokens';

const TextBox = getComponent('TextBox');
const Caption = getComponent('TextBoxCaption');
const Title = getComponent('TextBoxTitle');
const SubTitle = getComponent('TextBoxSubTitle');
const Label = getComponent('TextBoxLabel');
const BigTitle = getComponent('TextBoxBigTitle');
const BiggerTitle = getComponent('TextBoxBiggerTitle');

const title = 'Hello World of Plasma';
const subTitle = 'Use with wisdom';
const caption = 'Скидка 42%';
const label = 'yes indeed';

describe('plasma-ui: TextBox', () => {
    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <TextBox title={title} subTitle={subTitle} />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('__sub-title', () => {
        mount(
            <CypressTestDecorator>
                <TextBox title={title} subTitle={subTitle} />
                <hr />
                <TextBox>
                    <Title>{title}</Title>
                    <SubTitle>{subTitle}</SubTitle>
                </TextBox>
                <hr />
                <TextBox>
                    <Title>{title}</Title>
                    <SubTitle color={accent}>{subTitle}</SubTitle>
                </TextBox>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('__caption', () => {
        mount(
            <CypressTestDecorator>
                <TextBox caption={caption} title={title} subTitle={subTitle} />
                <hr />
                <TextBox>
                    <Title>{title}</Title>
                    <SubTitle>{subTitle}</SubTitle>
                    <Caption>{caption}</Caption>
                </TextBox>
                <hr />
                <TextBox>
                    <Title>{title}</Title>
                    <SubTitle>{subTitle}</SubTitle>
                    <Caption color={accent}>{caption}</Caption>
                </TextBox>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('__label', () => {
        mount(
            <CypressTestDecorator>
                <TextBox label={label} title={title} subTitle={subTitle} />
                <hr />
                <TextBox>
                    <Label>{label}</Label>
                    <Title>{title}</Title>
                    <SubTitle>{subTitle}</SubTitle>
                </TextBox>
                <hr />
                <TextBox>
                    <Label color={accent}>{label}</Label>
                    <Title>{title}</Title>
                    <SubTitle>{subTitle}</SubTitle>
                </TextBox>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_size', () => {
        mount(
            <CypressTestDecorator>
                <TextBox size="m" title={title} subTitle={subTitle} />
                <hr />
                <TextBox size="l" title={title} subTitle={subTitle} />
                <hr />
                <TextBox>
                    <BigTitle>{title}</BigTitle>
                    <SubTitle>{subTitle}</SubTitle>
                </TextBox>
                <hr />
                <TextBox>
                    <BiggerTitle>{title}</BiggerTitle>
                    <SubTitle>{subTitle}</SubTitle>
                </TextBox>
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
