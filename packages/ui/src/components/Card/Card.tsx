import React from 'react';
import styled from 'styled-components';

interface CardProps {
    id: string;
    disabled?: boolean;
    shouldFocusOnMount?: boolean;
    onClick?: (id: string) => void;
    onFocus?: (id: string) => void;
    onBlur?: (id: string) => void;
    className?: string;
}

const StyledRoot = styled.div`
    position: relative;
    display: inline-block;
    transition: transform 0.4s ease-in-out;

    &:focus {
        outline: none;
        transform: scale(1.08);

        &::before {
            opacity: 1;
        }
    }

    &:before {
        transition: opacity 0.2s ease-in-out;
        opacity: 0;
        border-radius: 28px;
        content: ' ';
        position: absolute;
        box-sizing: content-box;
        display: block;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        box-shadow: 0 0 0 4px #2ac673;
    }
`;

const StyledContainer = styled.div`
    background: rgba(255, 255, 255, 0.05);
    position: relative;
    width: 100%;
    overflow: hidden;
    box-sizing: content-box;

    display: flex;
    flex-direction: column;

    border-radius: 28px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);

    will-change: transform;
    will-change: background-color;
`;

export const Card: React.FC<CardProps> = ({
    shouldFocusOnMount,
    children,
    id,
    disabled,
    onClick,
    onBlur,
    onFocus,
    className,
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        if (shouldFocusOnMount && ref.current instanceof HTMLElement) {
            ref.current.focus();
        }
    }, [shouldFocusOnMount]);

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

    return (
        <StyledRoot
            className={className}
            ref={ref}
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
