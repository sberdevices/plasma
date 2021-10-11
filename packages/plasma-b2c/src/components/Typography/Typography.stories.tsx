import React from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import { InSpacingDecorator, disableProps } from '@sberdevices/plasma-sb-utils';
import { secondary } from '@sberdevices/plasma-core';

import type { SpacingProps } from '../../mixins';

import {
    DsplL,
    DsplM,
    DsplS,
    H1,
    H2,
    H3,
    H4,
    H5,
    BodyL,
    BodyM,
    BodyS,
    BodyXS,
    BodyXXS,
    TextL,
    TextM,
    TextS,
    TextXS,
    Headline1,
    Headline2,
    Headline3,
    Headline4,
    Subtitle,
    Headline5,
    Body1,
    ParagraphText1,
    Footnote1,
    Footnote2,
    Button1,
    Button2,
    Caption,
    Underline,
} from '.';

export default {
    title: 'Content/Typography',
    component: DsplL,
    argTypes: {
        ...disableProps(['ref', 'theme', 'as', 'forwardedAs']),
    },
    decorators: [InSpacingDecorator],
} as Meta;

export const Dspl: Story<SpacingProps> = (props) => (
    <>
        <DsplL {...props}>DsplL</DsplL>
        <DsplM {...props}>DsplM</DsplM>
        <DsplS {...props}>DsplS</DsplS>
    </>
);

export const H: Story<SpacingProps> = (props) => (
    <>
        <H1 {...props}>H1</H1>
        <H2 {...props}>H2</H2>
        <H3 {...props}>H3</H3>
        <H4 {...props}>H4</H4>
        <H5 {...props}>H5</H5>
    </>
);

export const Body: Story<SpacingProps> = (props) => (
    <>
        <BodyL {...props}>BodyL</BodyL>
        <BodyM {...props}>BodyM</BodyM>
        <BodyS {...props}>BodyS</BodyS>
        <BodyXS {...props}>BodyXS</BodyXS>
        <BodyXXS {...props}>BodyXXS</BodyXXS>
    </>
);

export const Text: Story<SpacingProps> = (props) => (
    <>
        <TextL {...props}>TextL</TextL>
        <TextM {...props}>TextM</TextM>
        <TextS {...props}>TextS</TextS>
        <TextXS {...props}>TextXS</TextXS>
    </>
);

const Section = styled.section`
    margin-bottom: 2.625rem;

    &:nth-child(n + 4) {
        margin-bottom: 1.375rem;
    }

    &:last-child {
        margin-bottom: 0;
    }
`;
const Note = styled(Footnote1)`
    font-weight: normal;
    color: ${secondary};
`;

export const Old = () => (
    <>
        <Section>
            <Headline1>Headline 1</Headline1>
            <Note>40/44 · Bold · LS 2</Note>
        </Section>
        <Section>
            <Headline2>Headline 2</Headline2>
            <Note>32/36 · Semibold · LS -1.1</Note>
        </Section>
        <Section>
            <Headline3>Headline 3</Headline3>
            <Note>24/28 · Semiblod · LS -2.2</Note>
        </Section>
        <Section>
            <Headline4>Headline 4</Headline4>
            <Note>20/24 · Semiblod · LS -2.5</Note>
        </Section>
        <Section>
            <Subtitle>Subtitle</Subtitle>
            <Note>20/24 · Regular · LS -2.2</Note>
        </Section>
        <Section>
            <Headline5>Headline 5</Headline5>
            <Note>16/20 · Semibold · LS -1.9</Note>
        </Section>

        <Section>
            <Body1>Body 1</Body1>
            <Note>16/20 · Regular · LS -1.9</Note>
        </Section>

        <Section>
            <ParagraphText1>Paragraph Text 1</ParagraphText1>
            <Note>16/24 · Regular · LS -1.9</Note>
        </Section>

        <Section>
            <Footnote1>Footnote 1</Footnote1>
            <Note>14/18 · Regular · LS -1.9</Note>
        </Section>
        <Section>
            <Footnote2>Footnote 2</Footnote2>
            <Note>14/18 · Semiblod · LS -1.9</Note>
        </Section>

        <Section>
            <Button1>Button 1</Button1>
            <Note>16/20 · Semiblod · LS 0</Note>
        </Section>
        <Section>
            <Button2>Button 2</Button2>
            <Note>24/28 · Semiblod · LS -2.2</Note>
        </Section>

        <Section>
            <Caption>Caption</Caption>
            <Note>12/16 · Regular · LS -2.2</Note>
        </Section>
        <Section>
            <Underline>Underline</Underline>
            <Note>10/12 · Medium · LS 1.25s</Note>
        </Section>
    </>
);
