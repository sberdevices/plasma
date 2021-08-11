import React from 'react';
import styled from 'styled-components';
import { secondary, scalingPixelBasis } from '@sberdevices/plasma-tokens';
import {
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
} from '@sberdevices/plasma-ui/components/Typography';

import { UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Content/Typography',
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const Section = styled.section`
    margin-bottom: ${42 / scalingPixelBasis}rem;

    &:nth-child(n + 4) {
        margin-bottom: ${22 / scalingPixelBasis}rem;
    }

    &:last-child {
        margin-bottom: 0;
    }
`;
const Note = styled(Footnote1)`
    font-weight: normal;
    color: ${secondary};
`;

export const Default = () => (
    <>
        <Section>
            <Display1>Display 1</Display1>
            <Note>96/96 · Medium · LS -1.9 </Note>
        </Section>
        <Section>
            <Display2>Display 2</Display2>
            <Note>60/64 · Medium · LS -1.9</Note>
        </Section>
        <Section>
            <Display3>Display 3</Display3>
            <Note>48/52 · Medium · LS 0</Note>
        </Section>

        <Section>
            <Headline1>Headline 1</Headline1>
            <Note>32/36 · Bold · LS -1.1</Note>
        </Section>
        <Section>
            <Headline2>Headline 2</Headline2>
            <Note>24/28 · Semiblod · LS -2.2</Note>
        </Section>
        <Section>
            <Headline3>Headline 3</Headline3>
            <Note>20/24 · Semiblod · LS -2.5</Note>
        </Section>
        <Section>
            <Headline4>Headline 4</Headline4>
            <Note>20/24 · Bold · LS -2.5</Note>
        </Section>

        <Section>
            <Body1>Body 1</Body1>
            <Note>16/20 · Medium · LS -1.9</Note>
        </Section>
        <Section>
            <Body2>Body 2</Body2>
            <Note>16/20 · Semiblod · LS -1.9</Note>
        </Section>
        <Section>
            <Body3>Body 3</Body3>
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
            <Footnote1>Footnote 1</Footnote1>
            <Note>14/18 · Medium · LS -1.9</Note>
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
