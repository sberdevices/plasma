import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
    disabled?: boolean;
    className?: string;
    highlightOnFocus?: boolean;
    scaleOnFocus?: boolean;
    shouldFocusOnMount?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

const OUTER_GAP = 4;

interface StyledRootProps {
    highlight?: boolean;
    scale?: boolean;
    gap: number;
}

const StyledRoot = styled.div<StyledRootProps>`
    display: inline-block;
    position: relative;
    transition: transform 0.4s ease-in-out;

    &:focus {
        outline: none;
        ${({ scale }) =>
            scale &&
            css`
                transform: scale(1.08);
            `}

        &::before {
            opacity: 1;
        }
    }

    ${({ highlight, gap }) =>
        highlight &&
        css`
            &:before {
                border-radius: 28px;
                box-shadow: 0 0 0 4px #2ac673;
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
    disabled,
    highlightOnFocus,
    scaleOnFocus,
    shouldFocusOnMount,
    onClick,
    onBlur,
    onFocus,
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        if (shouldFocusOnMount && ref.current instanceof HTMLElement) {
            ref.current.focus();
        }
    }, [shouldFocusOnMount]);

    return (
        <StyledRoot
            ref={ref}
            gap={OUTER_GAP}
            className={className}
            highlight={highlightOnFocus}
            scale={scaleOnFocus}
            tabIndex={disabled ? -1 : 0}
            onFocus={onFocus}
            onClick={onClick}
            onBlur={onBlur}
        >
            <StyledContainer>{children}</StyledContainer>
        </StyledRoot>
    );
};

export default Card;
