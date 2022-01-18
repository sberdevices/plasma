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
    Display1,
    Display2,
    Display3,
    Headline1,
    Headline2,
    Headline3,
    Headline4,
    Body1,
    Body2,
    Body3,
    ParagraphText1,
    ParagraphText2,
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
        <BodyL bold {...props}>
            BodyL Bold
        </BodyL>
        <BodyM {...props}>BodyM</BodyM>
        <BodyM bold {...props}>
            BodyM Bold
        </BodyM>
        <BodyS {...props}>BodyS</BodyS>
        <BodyS bold {...props}>
            BodyS Bold
        </BodyS>
        <BodyXS {...props}>BodyXS</BodyXS>
        <BodyXS bold {...props}>
            BodyXS Bold
        </BodyXS>
        <BodyXXS {...props}>BodyXXS</BodyXXS>
        <BodyXXS bold {...props}>
            BodyXXS Bold
        </BodyXXS>
    </>
);

export const Text: Story<SpacingProps> = (props) => (
    <>
        <TextL {...props}>TextL</TextL>
        <TextL bold {...props}>
            TextL Bold
        </TextL>
        <TextM {...props}>TextM</TextM>
        <TextM bold {...props}>
            TextM Bold
        </TextM>
        <TextS {...props}>TextS</TextS>
        <TextS bold {...props}>
            TextS Bold
        </TextS>
        <TextXS {...props}>TextXS</TextXS>
        <TextXS bold {...props}>
            TextXS Bold
        </TextXS>
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

export const Legacy = () => (
    <>
        <Section>
            <Display1>Display1</Display1>
            <Note>96/96 · Medium · LS -1.9 </Note>
        </Section>
        <Section>
            <Display2>Display2</Display2>
            <Note>60/64 · Medium · LS -1.9</Note>
        </Section>
        <Section>
            <Display3>Display3</Display3>
            <Note>48/52 · Medium · LS 0</Note>
        </Section>

        <Section>
            <Headline1>Headline1</Headline1>
            <Note>32/36 · Bold · LS -1.1</Note>
        </Section>
        <Section>
            <Headline2>Headline2</Headline2>
            <Note>24/28 · Semiblod · LS -2.2</Note>
        </Section>
        <Section>
            <Headline3>Headline3</Headline3>
            <Note>20/24 · Semiblod · LS -2.5</Note>
        </Section>
        <Section>
            <Headline4>Headline4</Headline4>
            <Note>20/24 · Bold · LS -2.5</Note>
        </Section>

        <Section>
            <Body1>Body1</Body1>
            <Note>16/20 · Medium · LS -1.9</Note>
        </Section>
        <Section>
            <Body2>Body2</Body2>
            <Note>16/20 · Semiblod · LS -1.9</Note>
        </Section>
        <Section>
            <Body3>Body3</Body3>
            <Note>16/20 · Bold · LS -1.9</Note>
        </Section>

        <Section>
            <ParagraphText1>Paragraph Text 1</ParagraphText1>
            <Note>16/22 · Regular · LS -1.9</Note>
        </Section>
        <Section>
            <ParagraphText2>Paragraph Text 2</ParagraphText2>
            <Note>16/22 · Semiblod · LS -1.9</Note>
        </Section>

        <Section>
            <Footnote1>Footnote1</Footnote1>
            <Note>14/18 · Medium · LS -1.9</Note>
        </Section>
        <Section>
            <Footnote2>Footnote2</Footnote2>
            <Note>14/18 · Semiblod · LS -1.9</Note>
        </Section>

        <Section>
            <Button1>Button1</Button1>
            <Note>16/20 · Semiblod · LS 0</Note>
        </Section>
        <Section>
            <Button2>Button2</Button2>
            <Note>14/16 · Semiblod · LS 0</Note>
        </Section>

        <Section>
            <Caption>Caption</Caption>
            <Note>12/16 · Medium · LS -2.2</Note>
        </Section>
        <Section>
            <Underline>Underline</Underline>
            <Note>10/12 · Medium · LS 1.25</Note>
        </Section>
    </>
);
