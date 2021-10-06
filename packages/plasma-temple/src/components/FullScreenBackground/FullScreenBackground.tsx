import React from 'react';
import styled from 'styled-components';

import { ObjectFit } from '../../types';
import { FullScreenBackgroundWrapper } from '../FullScreenBackgroundWrapper/FullScreenBackgroundWrapper';

const StyledBackgroundImage = styled.img<{ imageWidth: string; imageFit: ObjectFit }>`
    position: absolute;
    right: 0px;
    width: ${(props) => props.imageWidth};
    height: 100%;

    object-fit: ${(props) => props.imageFit};
`;

interface FullScreenBackgroundProps {
    src: string;
    imageWidth?: string;
    imageFit?: ObjectFit;
}

export const FullScreenBackground: React.FC<FullScreenBackgroundProps> = ({ src, imageWidth, imageFit }) => {
    const imageWidthValue = React.useMemo(() => imageWidth || '100%', [imageWidth]);
    const imageFitValue = React.useMemo(() => imageFit || 'cover', [imageFit]);
    return (
        <FullScreenBackgroundWrapper>
            <StyledBackgroundImage
                src={src}
                imageWidth={imageWidthValue}
                imageFit={imageFitValue}
                data-cy="background-image"
            />
        </FullScreenBackgroundWrapper>
    );
};
