import React, { FC, useLayoutEffect, useRef, useState } from 'react';
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
    animation-delay: 500ms;
    animation-duration: ${({ duration }) => duration}s;
`;

const Wrapper = styled.div<{ textAlign?: 'start' | 'center' | 'end' }>`
    display: flex;
    justify-content: ${({ textAlign }) =>
        textAlign === 'start' &&
        css`
            flex-start;
        `};
    justify-content: ${({ textAlign }) =>
        textAlign === 'center' &&
        css`
            center;
        `};
    justify-content: ${({ textAlign }) =>
        textAlign === 'end' &&
        css`
            flex-end;
        `};
`;

const StyledText = styled.div`
    white-space: nowrap;
`;

interface MarqueeProps {
    textAlign?: 'start' | 'center' | 'end';
}

/**
 * Компонент для отображения бегущей строки
 */
export const Marquee: FC<MarqueeProps> = ({ textAlign, children, ...rest }) => {
    const animationSpeed = 70;
    const textRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [state, setState] = useState({
        isPlaying: false,
        animationDuration: 0,
    });

    useLayoutEffect(() => {
        const wrapperWidth = wrapperRef.current?.getBoundingClientRect().width || 0;
        const textWidth = textRef.current?.getBoundingClientRect().width || 0;
        setState({
            isPlaying: wrapperWidth < textWidth,
            animationDuration: textWidth / animationSpeed,
        });
    }, [children]);

    const textDiv = <StyledText ref={textRef}>{children}</StyledText>;

    const marqueeText = (
        <MarqueeText isPlaying={state.isPlaying} duration={state.animationDuration}>
            {textDiv}
        </MarqueeText>
    );

    return (
        <Wrapper ref={wrapperRef} textAlign={!state.isPlaying ? textAlign : undefined} {...rest}>
            {state.isPlaying ? (
                <>
                    {marqueeText}
                    {marqueeText}
                </>
            ) : (
                textDiv
            )}
        </Wrapper>
    );
};
