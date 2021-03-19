import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';

const runningString = keyframes`
    0% { transform: translateX(0%) }
    100% { transform: translateX(-100%) }
`;

const RunningStringText = styled.div<{ isPlaying?: boolean }>`
    width: max-content;
    padding: 0 2.5rem;
    animation: ${({ isPlaying }) =>
        isPlaying &&
        css`
            ${runningString} 7s linear infinite;
        `};
`;

interface RunningStringProps {
    /**
     * Включить/выключить анимацию
     */
    isPlaying?: boolean;
    /**
     * Текст бегущей строки
     */
    text?: string;
}

/**
 * Компонент для отображения бегущей строки
 */
export const RunningString: FC<RunningStringProps> = ({ isPlaying = true, text, children }) => {
    return (
        <>
            <RunningStringText isPlaying={isPlaying}>{text || children}</RunningStringText>
            <RunningStringText isPlaying={isPlaying}>{text || children}</RunningStringText>
        </>
    );
};
