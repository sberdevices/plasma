import React from 'react';
import styled from 'styled-components';

import { ObjectFit } from '../../types';
import { FullScreenBackgroundWrapper } from '../FullScreenBackgroundWrapper/FullScreenBackgroundWrapper';

interface FullScreenBackgroundProps {
    src: string;
    imageWidth?: string;
    imageFit?: ObjectFit;
    mask?: boolean;
    className?: string;
}

const StyledBackgroundImage = styled.img<{ imageWidth: string; imageFit: ObjectFit }>`
    position: absolute;
    right: 0px;
    width: ${(props) => props.imageWidth};
    height: 100%;

    object-fit: ${(props) => props.imageFit};
`;

export const FullScreenBackground: React.FC<FullScreenBackgroundProps> = ({
    src,
    imageWidth = '100%',
    imageFit = 'cover',
    mask,
    className,
}) => {
    return (
        <FullScreenBackgroundWrapper className={className} mask={mask}>
            <StyledBackgroundImage src={src} imageWidth={imageWidth} imageFit={imageFit} data-cy="background-image" />
        </FullScreenBackgroundWrapper>
    );
};
