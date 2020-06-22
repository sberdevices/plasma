import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
    id: string;
    disabled?: boolean;
    className?: string;
    highlightOnFocus?: boolean;
    shouldFocusOnMount?: boolean;
    onClick?: (id: string) => void;
    onFocus?: (id: string) => void;
    onBlur?: (id: string) => void;
}

const OUTER_GAP = 4;

const StyledRoot = styled.div<{ highlightOnFocus: boolean }>`
    display: inline-block;
    position: relative;
    transition: transform 0.4s ease-in-out;

    &:focus {
        outline: none;
        transform: scale(1.08);

        &::before {
            opacity: 1;
        }
    }

    ${({ highlightOnFocus }) =>
        highlightOnFocus &&
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
                top: -${OUTER_GAP}px;
                left: -${OUTER_GAP}px;
                right: -${OUTER_GAP}px;
                bottom: -${OUTER_GAP}px;
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
    id,
    children,
    className,
    disabled,
    highlightOnFocus,
    shouldFocusOnMount,
    onClick,
    onBlur,
    onFocus,
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (onClick) {
            onClick(id);
        }
    };

    const handleFocus = () => {
        if (onFocus) {
            onFocus(id);
        }
    };

    const handleBlur = () => {
        if (onBlur) {
            onBlur(id);
        }
    };

    React.useLayoutEffect(() => {
        if (shouldFocusOnMount && ref.current instanceof HTMLElement) {
            ref.current.focus();
        }
    }, [shouldFocusOnMount]);

    return (
        <StyledRoot
            ref={ref}
            className={className}
            highlightOnFocus={Boolean(highlightOnFocus)}
            tabIndex={disabled ? -1 : 0}
            onFocus={handleFocus}
            onClick={handleClick}
            onBlur={handleBlur}
        >
            <StyledContainer>{children}</StyledContainer>
        </StyledRoot>
    );
};

export default Card;
