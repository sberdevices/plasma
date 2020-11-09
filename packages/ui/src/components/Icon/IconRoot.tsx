import React from 'react';
import styled, { css } from 'styled-components';
import { primary } from '@sberdevices/plasma-tokens';

const sizeMap = {
    xs: 1, // 16px
    s: 1.5, // 24px
    m: 2.25, // 36px
    l: 3, // 48px
    xl: 3.5, // 56px
    xxl: 4, // 64px
};

export type IconSize = keyof typeof sizeMap;

export interface IconProps {
    size?: IconSize;
    color?: string;
    className?: string;
}

export interface IconAsset {
    width?: number;
    height?: number;
    color?: string;
}

interface IconRootProps extends IconProps {
    icon: React.FC<IconAsset>;
}

interface StyledRootProps {
    $size: IconSize;
}

const StyledRoot = styled.span<StyledRootProps>`
    display: inline-block;
    box-sizing: border-box;

    ${({ $size }) => css`
        width: ${sizeMap[$size]}rem;
        height: ${sizeMap[$size]}rem;
    `}
`;

export const IconRoot: React.FC<IconRootProps> = ({ icon: IconComponent, size = 's', color, className }) => {
    const sizeVal = (`${sizeMap[size]}rem` as unknown) as number;

    return (
        <StyledRoot $size={size} className={className}>
            <IconComponent width={sizeVal} height={sizeVal} color={color || primary} />
        </StyledRoot>
    );
};
