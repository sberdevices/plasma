import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery, Image } from '@sberdevices/plasma-ui';

import { MediaObject } from '../../../types';
import { isMediaObject } from '../../../guards/isMediaObject';
import { getMediaObjectSrc } from '../../../utils';

interface StateLayoutImageProps {
    image: MediaObject | React.ReactNode;
}

const StyledImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: auto;

    width: 656px;

    ${mediaQuery(
        'M',
        2,
    )(css`
        width: 408px;
    `)}

    ${mediaQuery(
        'S',
        1,
    )(css`
        width: 55%;
        margin: 2.875rem auto;
    `)}
`;

const getImageToRender = (image: React.ReactNode | MediaObject) => {
    if (React.isValidElement(image)) {
        return image;
    }

    if (isMediaObject(image)) {
        const src = getMediaObjectSrc(image);
        return <Image base="div" src={src} ratio={image.ratio} customRatio={image.customRatio} />;
    }

    if (typeof image === 'string') {
        return <Image base="div" src={image} ratio="1 / 1" />;
    }

    return null;
};

export const StateLayoutImage: React.FC<StateLayoutImageProps> = ({ image }) => {
    const imageToRender = getImageToRender(image);

    return (
        imageToRender && (
            <StyledImageContainer data-cy="StateLayoutImage-container">{imageToRender}</StyledImageContainer>
        )
    );
};
