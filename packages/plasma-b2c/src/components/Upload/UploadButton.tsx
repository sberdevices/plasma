import React from 'react';
import type { FC, ReactNode, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import {
    surfaceLiquid01,
    surfaceLiquid02,
    surfaceLiquid03,
    primary,
    secondary,
    tertiary,
    transparent,
    success,
    critical,
    footnote2,
} from '@sberdevices/plasma-core';

import { Spinner } from '../Spinner';

const statuses = {
    error: {
        borderColor: critical,
    },
    success: {
        borderColor: success,
    },
};

type Status = keyof typeof statuses;

export interface UploadButtonProps {
    /**
     * Текст кнопки.
     */
    text: string;
    /**
     * Контент слева (напр., иконка).
     */
    contentLeft?: ReactNode;
    /**
     * Контент справа (напр., иконка или индикатор времени).
     */
    contentRight?: ReactNode;
    /**
     * Тип загружаемого контента.
     */
    type: 'audio' | 'image';
    /**
     * Статус компонента.
     */
    status?: Status;
    /**
     * Компонент неактивен.
     */
    disabled?: boolean;
    /**
     * Заполненность прогрессбара в процентах.
     */
    progress?: number;
}

const paints = {
    default: {
        backgroundColor: surfaceLiquid01,
        borderColor: tertiary,
        color: secondary,
    },
    progress: {
        backgroundColor: surfaceLiquid03,
        borderColor: transparent,
        color: secondary,
    },
    audio: {
        backgroundColor: transparent,
        borderColor: transparent,
        color: primary,
    },
};

type Paint = keyof typeof paints;

export const StyledButton = styled.button<{ paint: Paint; status?: Status; disabled?: boolean }>`
    ${footnote2}

    position: relative;

    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;

    width: 100%;
    height: 4rem;
    padding: 1.25rem 1rem;

    appearance: none;
    border: 1px dashed;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    transition-property: transform, background-color, border-color, color;

    &:hover:not(:disabled) {
        background-color: ${surfaceLiquid02};
        transform: scale(1.04);
    }

    ${({ paint }) => paints[paint]}
    ${({ status }) => status && statuses[status]}
    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.4;
            cursor: not-allowed;
        `}
`;
const StyledText = styled.span`
    position: relative;
    z-index: 1;
    display: inline-flex;
`;
const StyledContent = styled.span`
    position: relative;
    z-index: 1;
    display: inline-flex;

    &:first-child {
        margin-right: 0.75rem;
    }

    &:last-child {
        margin-left: auto;
        padding-left: 0.75rem;
        color: ${secondary};
    }
`;
const StyledProgress = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;

    border-radius: 0.75rem;
    overflow: hidden;
`;
const StyledProgressbar = styled.div`
    height: 100%;
    background: linear-gradient(270deg, rgba(8, 8, 8, 0.14) 0%, rgba(8, 8, 8, 0) 100%);
    transition: width 0.3s ease-in-out;
`;
const StyledSpinner = styled(Spinner)`
    position: relative;
    z-index: 1;
    margin-left: 0.875rem;
`;

export const UploadButton: FC<UploadButtonProps & HTMLAttributes<HTMLButtonElement>> = ({
    text,
    contentLeft,
    contentRight,
    type = 'default',
    status,
    disabled,
    progress: rawProgress,
    ...rest
}) => {
    const isProgress = rawProgress !== undefined;
    const progress = Math.min(Math.max(rawProgress || 0, 0), 100);
    let paint: Paint;

    if (isProgress) {
        paint = 'progress';
    } else if (type === 'audio') {
        paint = 'audio';
    } else {
        paint = 'default';
    }

    return (
        <StyledButton type="button" paint={paint} status={status} disabled={disabled} {...rest}>
            {isProgress && (
                <StyledProgress>
                    <StyledProgressbar style={{ width: `${progress}%` }} />
                </StyledProgress>
            )}
            {contentLeft && <StyledContent>{contentLeft}</StyledContent>}
            {text && <StyledText>{text}</StyledText>}
            {contentRight && <StyledContent>{contentRight}</StyledContent>}
            {isProgress && <StyledSpinner size="1.25rem" />}
        </StyledButton>
    );
};
