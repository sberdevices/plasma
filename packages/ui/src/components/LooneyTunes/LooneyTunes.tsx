import React from 'react';
import styled, { css } from 'styled-components';

interface LooneyTunesProps {
    size: number;
    maxSize: number;
    circles: number;
    className?: string;
}

interface StyledCircleProps {
    diameter: number;
}

interface StyledLavaCircleProps {
    pos: number;
    diameter: number;
}

const StyledRoot = styled.div<StyledCircleProps>`
    display: inline-flex;
    box-sizing: border-box;

    ${({ diameter: size }) => css`
        width: ${size}px;
        height: ${size}px;
    `}
`;

const StyledBody = styled.div`
    position: relative;

    flex: 1;
`;

const StyledCircle = styled.div<StyledCircleProps>`
    ${({ diameter: size }) => css`
        box-sizing: border-box;
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        margin-top: -${size / 2}px;
        margin-left: -${size / 2}px;
    `}
`;

const StyledShadowCircle = styled(StyledCircle)`
    opacity: 0.3;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.15);
`;

const StyledContent = styled(StyledCircle)`
    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(255, 255, 255, 0.03);
    box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(50px);
`;

const StyledLavaWrapper = styled(StyledCircle)`
    overflow: hidden;

    background: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(43px);
`;

const StyledLavaCircle = styled.div<StyledLavaCircleProps>`
    ${({ pos: offset, diameter: size }) => css`
        position: absolute;
        top: 0;
        right: 0;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        opacity: 0.5;
        transform: translate(-${offset}%, ${offset}%);
        background: linear-gradient(95deg, #00ffe6 33%, #80ff00 95%);
        filter: blur(24px);
    `}
`;

export const LooneyTunes: React.FC<LooneyTunesProps> = ({ className, size: start, maxSize, circles, children }) => {
    const items = React.useMemo(() => new Array(circles).fill(0), [circles]);
    const circleSize = React.useMemo(() => (maxSize - start) / circles, [start, maxSize, circles]);
    const lavaSize = React.useMemo(() => start / Math.PI, [start]);
    const lavaPos = React.useMemo(() => (lavaSize / start) * 100, [start, lavaSize]);

    return (
        <StyledRoot diameter={start} className={className}>
            <StyledBody>
                {items.map((_, i) => (
                    <StyledShadowCircle key={`circle-${i}`} diameter={start + (items.length - i) * circleSize} />
                ))}

                <StyledLavaWrapper diameter={start}>
                    <StyledLavaCircle pos={lavaPos} diameter={lavaSize} />
                </StyledLavaWrapper>
                <StyledContent diameter={start}>{children}</StyledContent>
            </StyledBody>
        </StyledRoot>
    );
};
