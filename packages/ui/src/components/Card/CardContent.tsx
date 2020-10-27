import React from 'react';
import styled, { css } from 'styled-components';

interface StyledRootProps {
    cover?: boolean;
    disabled?: boolean;
}

const StyledRoot = styled.div<CardContentProps>`
    display: flex;
    flex-direction: column;

    position: relative;

    box-sizing: border-box;
    padding: 32px;

    border-radius: inherit;

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.5;
        `}

    ${({ cover }) =>
        cover &&
        css`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            justify-content: flex-end;

            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.74) 100%);
        `}
`;

export interface CardContentProps extends StyledRootProps {
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ disabled, cover, className, children }) => {
    return (
        <StyledRoot cover={cover} disabled={disabled} className={className}>
            {children}
        </StyledRoot>
    );
};
