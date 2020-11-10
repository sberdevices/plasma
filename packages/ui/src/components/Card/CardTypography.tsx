/* stylelint-disable */ // TODO:
import styled, { css } from 'styled-components';
import { primary, secondary, tertiary } from '@sberdevices/plasma-tokens';

import { Headline1, Headline3, Body1, Footnote1 } from '../Typography';

import { StyledCard } from './Card';

const views = {
    primary,
    secondary,
    tertiary,
};

interface ViewProps {
    view?: keyof typeof views;
}

interface LineProps {
    lines?: number;
}

const viewMixin = ({ view = 'primary' }: ViewProps) => `
    color: ${views[view]};
`;

export const CardHeadline1 = styled(Headline1)<ViewProps>`
    ${Headline3} + & {
        margin-top: ${12 / 32}em;
    }

    ${viewMixin};
`;

export const CardHeadline3 = styled(Headline3)<ViewProps>`
    ${viewMixin};
`;

export const CardBody1 = styled(Body1)<ViewProps & LineProps>`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    box-sizing: border-box;

    white-space: normal;

    ${({ lines = 2 }) => css`
        -webkit-line-clamp: ${lines};
    `}

    ${viewMixin};
`;

export const CardFootnote1 = styled(Footnote1)<ViewProps>`
    transition: color 0.1s ease-in-out;

    ${Headline1} + & {
        margin-top: ${6 / 14}em;
    }

    ${StyledCard} + & {
        margin-top: ${8 / 14}em;
    }

    ${viewMixin};
`;
