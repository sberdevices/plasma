import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';
import { applyHyphens, BreakWordProps, TextBox } from '@sberdevices/plasma-ui';
import { body1, footnote1, headline1, headline2, secondary } from '@sberdevices/plasma-tokens';

export interface ProductTitleProps {
    /** Заголовок */
    title: string;
    /** Подзаголовок */
    subtitle?: string;
    className?: string;
}

export const Title = styled.div<BreakWordProps>`
    ${applyHyphens}
    ${headline2}

    ${mediaQuery(
        'XL',
        2,
    )(css`
        ${headline1}
    `)}
`;

export const StyledSubtitle = styled.div<BreakWordProps>`
    ${applyHyphens}
    ${body1}

    ${mediaQuery(
        'S',
        1,
    )(css`
        ${footnote1}
    `)}

    color: ${secondary};
    margin-top: 0.5rem;
`;

/** Заголовок товара на странице товара */
export const ProductTitle: React.FC<ProductTitleProps> = ({ title, subtitle, ...rest }) => (
    <TextBox {...rest}>
        <Title breakWord={false}>{title}</Title>
        {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
    </TextBox>
);
