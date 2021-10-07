import React, { useRef } from 'react';
import type { FC } from 'react';
import styled, { css } from 'styled-components';
import { primary, footnote1, surfaceLiquid03, surfaceLiquid02 } from '@sberdevices/plasma-core';
import { IconPlay, IconPause, IconTrashFilled } from '@sberdevices/plasma-icons';

import { useAudioPlayer, formatSecondsToMintues } from './utils';

const StyledDelete = styled.button`
    position: absolute;
    right: 1.25rem;
    top: 1.25rem;
    background: transparent;
    border: 0;
    cursor: pointer;
    display: none;

    svg {
        color: ${surfaceLiquid03};
    }

    &:hover {
        svg {
            color: ${primary};
        }
    }
`;

export const StyledControl = styled.button`
    background: transparent;
    border: 0;
    cursor: pointer;

    display: flex;
`;

const StyledContainer = styled.div<{ isSelected: boolean; isDisabled: boolean }>`
    position: relative;

    display: flex;
    align-items: center;
    box-sizing: border-box;

    width: 100%;
    height: 4rem;
    padding: 1.25rem 1rem;

    appearance: none;
    border-radius: 0.75rem;

    cursor: pointer;

    ${({ isSelected }) =>
        isSelected &&
        css`
            background-color: ${surfaceLiquid03};
        `}

    ${StyledControl} {
        ${({ isDisabled }) =>
            isDisabled &&
            css`
                opacity: 0.24;
                pointer-events: none;
            `}
    }
`;

const StyledDuration = styled.div`
    position: absolute;
    right: 1rem;

    text-align: right;

    color: ${primary};

    mix-blend-mode: normal;
    opacity: 0.5;
`;

const StyledRoot = styled.div`
    ${footnote1}

    position: relative;
    width: 100%;

    &:hover ${StyledDelete} {
        display: block;
    }

    &:hover ${StyledDuration} {
        display: none;
    }

    &:hover ${StyledContainer} {
        background-color: ${surfaceLiquid02};
    }
`;

const StyledTitle = styled.div`
    margin-left: 1rem;
    color: ${primary};
`;

export interface AudioPlayerProps {
    /**
     * Название трека.
     */
    title: string;
    /**
     * Адрес расплололжения трека.
     */
    url: string;
    /**
     * Длительность трека.
     */
    duration?: number;
    /**
     * Выделен ли компонент.
     */
    isSelected: boolean;
    /**
     * Воспроизводится ли трек.
     */
    isPlaying: boolean;
    /**
     * Можно ли удалить компонент.
     */
    canDelete: boolean;
    /**
     * Колбэк на клик по компоненту.
     */
    onClick: () => void;
    /**
     * Колбэк на удаление компонента.
     */
    onDelete: () => void;
    /**
     * Колбэк на воспроизведение трека.
     */
    onPlay: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

/**
 * Компоннет для воспроизведения аудио.
 */
export const AudioPlayer: FC<AudioPlayerProps> = ({
    title,
    duration,
    url,
    isPlaying,
    isSelected,
    canDelete,
    onClick,
    onDelete,
    onPlay,
    ...props
}) => {
    const ref = useRef<HTMLAudioElement>();

    const [canPlaying] = useAudioPlayer(url, isPlaying, ref);

    return (
        <StyledRoot {...props}>
            <StyledContainer isSelected={isSelected} isDisabled={!canPlaying} onClick={onClick}>
                <StyledControl onClick={onPlay}>{isPlaying ? <IconPause /> : <IconPlay />}</StyledControl>
                <StyledTitle>{title}</StyledTitle>
                {duration && <StyledDuration>{formatSecondsToMintues(duration)}</StyledDuration>}
            </StyledContainer>

            {canDelete && (
                <StyledDelete onClick={onDelete}>
                    <IconTrashFilled />
                </StyledDelete>
            )}
        </StyledRoot>
    );
};
