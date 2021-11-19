import React from 'react';
import styled from 'styled-components';

import { applyDisabled, applyBlur, applyEllipsis } from '../../mixins';

import type { ButtonIsContentProps, StyledButtonProps } from './Button.types';

/**
 * Корневой элемент для стилизации кнопки.
 * Должен быть передан в функцию `createButton`.
 */
export const ButtonRoot = styled.button<StyledButtonProps>`
    position: relative;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;

    appearance: none;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    a& {
        text-decoration: none;
    }

    &:focus {
        outline: none;
    }

    ${applyDisabled}
    ${applyBlur}
`;

/**
 * A text wrapping element, that used when `text` prop is passed.
 * @private
 */
export const ButtonText = styled.span<ButtonIsContentProps>`
    box-sizing: border-box;

    ${applyEllipsis}

    ${({ $isContentLeft: isContentLeft }) => isContentLeft && 'margin-left: 0.375rem;'}
    ${({ $isContentRight: isContentRight }) => isContentRight && 'margin-right: 0.375rem;'}
`;

/**
 * Базовая кнопка.
 * @deprecated
 */
export const Button = React.forwardRef<any, any>(
    // eslint-disable-next-line prefer-arrow-callback
    function Button(props, ref) {
        return <ButtonRoot ref={ref} {...props} />;
    },
);

Button.defaultProps = {
    pin: 'square-square',
    outlined: false,
};
