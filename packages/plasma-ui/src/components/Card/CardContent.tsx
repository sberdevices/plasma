import React from 'react';
import styled, { css } from 'styled-components';
import { DisabledProps } from '@sberdevices/plasma-core';

interface CoverProps {
    /**
     * Контент перекрывает собой картинку.
     */
    cover?: true;
    /**
     * Градиент контента.
     */
    coverGradient?: boolean;
}
interface NoCoverProps {
    cover?: false;
    coverGradient?: never;
}
interface OtherProps extends DisabledProps {
    compact?: boolean;
}

export type CardContentProps = (CoverProps | NoCoverProps) & OtherProps & React.HTMLAttributes<HTMLDivElement>;

interface StyledRootProps extends OtherProps {
    cover?: boolean;
    coverGradient?: boolean;
}

const StyledRoot = styled.div<StyledRootProps>`
    display: flex;
    flex-direction: column;

    position: relative;

    box-sizing: border-box;
    padding: ${({ compact }) => (compact ? 0.375 : 1)}rem 1rem;

    border-radius: inherit;

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.5;
        `}

    ${({ cover, coverGradient }) =>
        cover &&
        css`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            justify-content: flex-end;

            ${coverGradient &&
            css`
                background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.74) 100%);
            `};
        `}
`;

/**
 * Компонент для отображения как текстового, так и любого другого контента.
 */
export const CardContent: React.FC<CardContentProps> = ({ cover, coverGradient = true, children, ...rest }) => {
    return (
        <StyledRoot cover={cover} coverGradient={coverGradient} {...rest}>
            {children}
        </StyledRoot>
    );
};
