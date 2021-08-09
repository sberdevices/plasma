import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const marquee = keyframes`
    0% { transform: translateX(0%) }
    100% { transform: translateX(-100%) }
`;

const MarqueeText = styled.div<{ isPlaying: boolean; duration: number }>`
    padding-right: 4rem;
    animation: ${({ isPlaying }) =>
        isPlaying &&
        css`
            ${marquee} linear infinite;
        `};
    animation-duration: ${({ duration }) => duration}s;
`;

const Wrapper = styled.div`
    width: max-content;
    display: flex;
`;

interface MarqueeProps {
    children?: React.ReactNode;
    /**
     * Включить/выключить анимацию
     */
    isPlaying?: boolean;
    /**
     * Текст бегущей строки
     */
    text?: string;
    /**
     * Длительность анимации
     */
    duration?: number;
}

/**
 * Компонент для отображения бегущей строки
 */
export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
    ({ isPlaying = true, duration = 10, text, children }, childRef) => {
        const marqueeTextNode = <div ref={childRef}>{text || children}</div>;

        return (
            <Wrapper>
                {isPlaying ? (
                    <>
                        <MarqueeText isPlaying={isPlaying} duration={duration}>
                            {marqueeTextNode}
                        </MarqueeText>
                        <MarqueeText isPlaying={isPlaying} duration={duration}>
                            {marqueeTextNode}
                        </MarqueeText>
                    </>
                ) : (
                    <>{marqueeTextNode}</>
                )}
            </Wrapper>
        );
    },
);
