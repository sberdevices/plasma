import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

const marquee = keyframes`
    0% { transform: translateX(0%) }
    100% { transform: translateX(-100%) }
`;

const MarqueeText = styled.div<{ isPlaying?: boolean }>`
    width: max-content;
    padding-right: 4rem;
    animation: ${({ isPlaying }) =>
        isPlaying &&
        css`
            ${marquee} 10s linear infinite;
        `};
`;

interface MarqueeProps {
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
export const Marquee: FC<MarqueeProps> = ({ isPlaying = true, text, children }) => {
    return (
        <>
            <MarqueeText isPlaying={isPlaying}>{text || children}</MarqueeText>
            <MarqueeText isPlaying={isPlaying}>{text || children}</MarqueeText>
        </>
    );
};
