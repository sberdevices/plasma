import React from 'react';
import styled, { css } from 'styled-components';

import { toCssSize } from '../../utils';

const ratios = {
    '1 / 1': '100',
    '1 / 2': '50',
    '2 / 1': '100',
    '3 / 4': '133.3333',
    '4 / 3': '75',
    '9 / 16': '177.7778',
    '16 / 9': '56.25',
};
type Ratio = keyof typeof ratios;

interface StyledRootProps {
    $ratio?: Ratio;
    $customRatio?: string;
    $height?: string | number;
}

interface HeightProps {
    height?: string | number;
}

interface RatioProps {
    ratio?: Ratio;
}

interface CustomRatioProps {
    customRatio?: string;
}

export type ImageProps = (HeightProps | RatioProps | CustomRatioProps) &
    React.ImgHTMLAttributes<HTMLImageElement> & {
        src: string;
        alt?: string;
        children?: never;
    };

const StyledRoot = styled.div<StyledRootProps>`
    display: block;
    box-sizing: border-box;
    overflow: hidden;

    width: 100%;

    ${({ $ratio, $customRatio }) =>
        ($ratio || $customRatio) &&
        css`
            height: 0;
            padding-bottom: ${$ratio ? ratios[$ratio] : $customRatio}%;
        `}

    ${({ $height }) =>
        $height &&
        css`
            height: ${toCssSize($height)};
        `}
`;

const StyledImg = styled.img`
    width: 100%;
`;

/**
 * Компонент для отображения картинок.
 */
export const Image: React.FC<ImageProps> = ({ src, alt, ...props }) => (
    <StyledRoot
        $ratio={'ratio' in props ? props.ratio : undefined}
        $customRatio={'customRatio' in props ? props.customRatio : undefined}
        $height={'height' in props ? props.height : undefined}
        {...props}
    >
        <StyledImg src={src} alt={alt} />
    </StyledRoot>
);
