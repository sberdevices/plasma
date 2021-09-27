import styled, { css, InterpolationFunction } from 'styled-components';
import {
    primary,
    secondary,
    tertiary,
    surfaceLiquid01,
    surfaceLiquid02,
    success,
    warning,
    critical,
    buttonSuccess,
    buttonWarning,
    buttonCritical,
    applyEllipsis,
    headline2,
    caption,
} from '@sberdevices/plasma-core';

const statuses = {
    success,
    warning,
    error: critical,
};

const backgroundStatuses = {
    success: buttonSuccess,
    warning: buttonWarning,
    error: buttonCritical,
};

export const FieldInput = styled.input`
    ${headline2}

    background-color: transparent;
    border: 0 none;
    border-radius: 0.75rem;

    padding: 1.25rem 1.5rem;
    padding-bottom: 3.5rem;

    color: ${secondary};

    letter-spacing: -0.019em;
    font-weight: normal;
    line-height: 2rem;

    &:disabled {
        cursor: inherit;
        color: ${tertiary};
    }

    &:focus:not(:disabled) {
        color: ${primary};
    }
`;

interface StatusProps {
    /**
     * Статус компонента: заполнен успешно / с ошибкой.
     */
    status?: keyof typeof statuses;
}
interface FieldWrapperProps extends StatusProps {
    disabled?: boolean;
}

const applyInputStatus: InterpolationFunction<Pick<FieldWrapperProps, 'status'>> = ({ status }) =>
    status &&
    css`
        position: relative;

        background: transparent;
        caret-color: ${statuses[status]};

        ${FieldInput} {
            color: ${statuses[status]};
        }

        ${FieldInput}:focus {
            color: ${statuses[status]};
        }

        &:hover:not([disabled]),
        &:focus-within:not([disabled]) {
            background: transparent;
        }

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            content: '';
            background: ${backgroundStatuses[status]};
            opacity: 0.3;

            border: 0 none;
            border-radius: 0.75rem;

            pointer-events: none;
        }
    `;

/**
 * Обертка над полем ввода для отображения фона(псевдокласса ::before нет для input-а)
 */
export const FieldWrapper = styled.div<FieldWrapperProps>`
    background-color: ${surfaceLiquid01};
    border: 0 none;
    border-radius: 0.75rem;

    &:hover:not([disabled]),
    &:focus-within:not([disabled]) {
        background-color: ${surfaceLiquid02};
    }

    ${applyInputStatus};
`;

export const FieldHelpers = styled.div`
    position: absolute;
    height: fit-content;
    width: 100%;

    bottom: 1.25rem;
    padding: 0 1.5rem;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
`;

/**
 * Вспомогательный текст снизу для поля ввода
 */
export const FieldHelper = styled.span`
    ${caption}
    margin: 0;
    padding: 0;

    ${applyEllipsis};
`;
