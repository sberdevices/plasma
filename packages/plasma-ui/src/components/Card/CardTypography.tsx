/* stylelint-disable */ // TODO:
import styled, { css } from 'styled-components';
import { primary, secondary, tertiary } from '@sberdevices/plasma-tokens';

import {
    Body1,
    Body2,
    ParagraphText1,
    ParagraphText2,
    Headline1,
    Headline2,
    Headline3,
    Footnote1,
    Footnote2,
} from '../Typography';

const views = {
    primary,
    secondary,
    tertiary,
};

interface ViewProps {
    view?: keyof typeof views;
}

interface LinesProps {
    lines?: number;
}

const linesMixin = ({ lines = 2 }) => css`
    display: -webkit-box;
    overflow: hidden;
    box-sizing: border-box;

    white-space: normal;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${lines};
`;

const viewMixin = ({ view = 'primary' }: ViewProps) => css`
    transition: ${({ theme }) => (theme.lowPerformance ? 'unset' : 'color 0.1s ease-in-out')};
    color: ${views[view]};
`;

export const CardHeadline1 = styled(Headline1)<ViewProps>`
    ${viewMixin};
`;

export const CardHeadline2 = styled(Headline2)<ViewProps>`
    ${viewMixin};
`;

export const CardHeadline3 = styled(Headline3)<ViewProps>`
    ${viewMixin};
`;

export const CardFootnote1 = styled(Footnote1)<ViewProps>`
    ${viewMixin};
`;

export const CardFootnote2 = styled(Footnote2)<ViewProps>`
    ${viewMixin};
`;

export const CardBody1 = styled(Body1)<ViewProps & LinesProps>`
    ${linesMixin};
    ${viewMixin};
`;

export const CardBody2 = styled(Body2)<ViewProps & LinesProps>`
    ${linesMixin};
    ${viewMixin};
`;

export const CardParagraph1 = styled(ParagraphText1)<ViewProps & LinesProps>`
    ${linesMixin};
    ${viewMixin};
`;

export const CardParagraph2 = styled(ParagraphText2)<ViewProps & LinesProps>`
    ${linesMixin};
    ${viewMixin};
`;
