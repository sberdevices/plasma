import React from 'react';
import styled, { css } from 'styled-components';

interface StyledHeaderButtonProps {
    disabled?: boolean;
}

const StyledHeaderButton = styled.div<StyledHeaderButtonProps>`
    position: relative;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    border: none;
    border-radius: 24px;
    background: none;

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.4;
        `}

    ${({ theme }) => css`
        &::before {
            position: absolute;
            top: -4px;
            right: -4px;
            bottom: -4px;
            left: -4px;

            display: block;

            box-sizing: content-box;

            content: ' ';

            opacity: 0;
            border-radius: 28px;
            box-shadow: 0 0 0 4px ${theme.uiColor.highlight};

            transition: opacity 0.2s ease-in-out;
        }

        &:focus {
            outline: none;
            background: ${theme.buttonColor.secondary};

            &::before {
                opacity: 1;
            }
        }
    `}

    ${({ disabled }) => css`
        ${disabled &&
        css`
            &:focus {
                background: none;

                &::before {
                    opacity: 0;
                }
            }
        `}
    `};
`;

interface HeaderButtonProps {
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ className, disabled, onClick: handleClick, children }) => {
    return (
        <StyledHeaderButton
            className={className}
            tabIndex={disabled ? -1 : 0}
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </StyledHeaderButton>
    );
};
