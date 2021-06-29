import React from 'react';
import styled from 'styled-components';

import { FullScreenBackgroundWrapper } from '..';

const StyledBackgroundImage = styled.img`
    width: 100%;
    height: 100%;

    object-fit: cover;
`;

interface FullScreenBackgroundProps {
    src: string;
}

export const FullScreenBackground: React.FC<FullScreenBackgroundProps> = ({ src }) => {
    return (
        <FullScreenBackgroundWrapper>
            <StyledBackgroundImage src={src} data-cy="background-image" />
        </FullScreenBackgroundWrapper>
    );
};
