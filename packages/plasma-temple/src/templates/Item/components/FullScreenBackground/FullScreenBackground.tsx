import React from 'react';
import styled from 'styled-components';

interface FullScreenBackgroundProps {
    src: string;
}

const StyledBackgroundWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;

    height: 100vh;

    user-select: none;
    pointer-events: none;

    opacity: 0.5;
    mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 1) 100%);
`;

const StyledBackgroundImage = styled.img`
    height: 100vh;

    object-fit: cover;
`;

export const FullScreenBackground: React.FC<FullScreenBackgroundProps> = ({ src }) => (
    <StyledBackgroundWrapper>
        <StyledBackgroundImage src={src} />
    </StyledBackgroundWrapper>
);
