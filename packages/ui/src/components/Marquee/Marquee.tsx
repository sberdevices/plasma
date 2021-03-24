import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

const marquee = keyframes`
    0% { transform: translateX(0%) }
    100% { transform: translateX(-100%) }
`;

const MarqueeText = styled.div<{ isPlaying?: boolean }>`
    padding-right: 4rem;
    animation: ${({ isPlaying }) =>
        isPlaying &&
        css`
            ${marquee} 10s linear infinite;
        `};
`;

const Wrapper = styled.div`
    width: max-content;
    display: flex;
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
        <Wrapper>
            <MarqueeText isPlaying={isPlaying}>{text || children}</MarqueeText>
            {isPlaying && <MarqueeText isPlaying={isPlaying}>{text || children}</MarqueeText>}
        </Wrapper>
    );
};
