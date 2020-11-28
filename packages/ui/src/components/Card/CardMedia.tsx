import React from 'react';
import styled, { css } from 'styled-components';

import { toCssSize } from '../../utils';

const ratios = {
    '1:1': '100',
    '3:4': '75',
    '4:3': '133.3333',
    '9:16': '56.25',
    '16:9': '177.7777',
};
type Ratio = keyof typeof ratios;

interface StyledRootProps {
    $ratio?: Ratio;
    $customRatio?: string;
    $height?: string | number;
    $disabled?: boolean;
}

const StyledRoot = styled.div<StyledRootProps>`
    position: relative;

    display: block;
    box-sizing: border-box;

    width: 100%;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    ${({ $disabled }) =>
        $disabled &&
        css`
            opacity: 0.5;
        `}

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

interface HeightProps {
    height?: string | number;
}

interface RatioProps {
    ratio?: Ratio;
}

interface CustomRatioProps {
    customRatio?: string;
}

export type CardMediaProps = (HeightProps | RatioProps | CustomRatioProps) & {
    src: string;
    disabled?: boolean;
};

export const CardMedia: React.FC<CardMediaProps & React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    src,
    style,
    ...props
}) => {
    return (
        <StyledRoot
            style={{ ...style, backgroundImage: `url('${src}')` }}
            $ratio={'ratio' in props ? props.ratio : undefined}
            $customRatio={'customRatio' in props ? props.customRatio : undefined}
            $height={'height' in props ? props.height : undefined}
            {...props}
        >
            {children}
        </StyledRoot>
    );
};
