import React from 'react';
import styled, { css } from 'styled-components';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    focused?: boolean;
    highlightOnFocus?: boolean;
    scaleOnFocus?: boolean;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
}

interface StyledRootProps {
    focused: boolean;
    highlightOnFocus: boolean;
    scaleOnFocus: boolean;
}

const StyledRoot = styled.div<StyledRootProps>`
    position: relative;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    border-radius: 40px;
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
    will-change: background-color, transform;

    transition: transform 0.4s ease-in-out;

    ${({ theme, highlightOnFocus, focused, scaleOnFocus }) => css`
        ${highlightOnFocus &&
        css`
            &:before {
                border-radius: 44px;
                box-shadow: 0 0 0 4px ${theme.uiColor.highlight};
                box-sizing: content-box;
                content: ' ';
                display: block;
                opacity: 0;
                transition: opacity 0.2s ease-in-out;
                position: absolute;
                top: -4px;
                left: -4px;
                right: -4px;
                bottom: -4px;
            }
        `}

        ${focused &&
        css`
            &:before {
                opacity: 1;
            }
            ${scaleOnFocus &&
            css`
                transform: scale(1.08);
            `}
        `}
        &:focus {
            outline: none;
            ${scaleOnFocus &&
            css`
                transform: scale(1.08);
            `}

            &:before {
                opacity: 1;
            }
        }
    `}
`;

// eslint-disable-next-line prefer-arrow-callback
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
    {
        children,
        className,
        highlightOnFocus = false,
        scaleOnFocus = false,
        focused = false,
        onClick,
        onBlur,
        onFocus,
        ...attributes
    },
    ref,
) {
    return (
        <StyledRoot
            {...attributes}
            focused={focused}
            className={className}
            highlightOnFocus={highlightOnFocus}
            scaleOnFocus={scaleOnFocus}
            onFocus={onFocus}
            onClick={onClick}
            onBlur={onBlur}
            ref={ref}
        >
            {children}
        </StyledRoot>
    );
});
