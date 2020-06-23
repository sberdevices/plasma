import React from 'react';
import styled, { css } from 'styled-components';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    highlightOnFocus?: boolean;
    scaleOnFocus?: boolean;
    focused?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

const OUTER_GAP = 4;

interface StyledRootProps {
    highlight?: boolean;
    scale?: boolean;
    focused?: boolean;
    gap: number;
}

const StyledRoot = styled.div<StyledRootProps>`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    position: relative;
    transition: transform 0.4s ease-in-out;

    ${({ theme, highlight, gap }) =>
        highlight &&
        css`
            &:before {
                border-radius: 28px;
                box-shadow: 0 0 0 4px ${theme.color.highlight};
                box-sizing: content-box;
                content: ' ';
                display: block;
                opacity: 0;
                transition: opacity 0.2s ease-in-out;
                position: absolute;
                top: -${gap}px;
                left: -${gap}px;
                right: -${gap}px;
                bottom: -${gap}px;
            }
        `}

    ${({ focused, scale }) =>
        focused &&
        css`
            &:before {
                opacity: 1;
            }
            ${scale &&
            css`
                transform: scale(1.08);
            `}
        `}

    &:focus {
        outline: none;
        ${({ scale }) =>
            scale &&
            css`
                transform: scale(1.08);
            `}

        &:before {
            opacity: 1;
        }
    }
`;

const StyledContainer = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 28px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    width: 100%;
    will-change: transform;
    will-change: background-color;
`;

export const Card: React.FC<CardProps> = ({
    children,
    className,
    highlightOnFocus,
    scaleOnFocus,
    focused,
    onClick,
    onBlur,
    onFocus,
    ...attributes
}) => {
    return (
        <StyledRoot
            {...attributes}
            focused={focused}
            gap={OUTER_GAP}
            className={className}
            highlight={highlightOnFocus}
            scale={scaleOnFocus}
            onFocus={onFocus}
            onClick={onClick}
            onBlur={onBlur}
        >
            <StyledContainer>{children}</StyledContainer>
        </StyledRoot>
    );
};

export default Card;
