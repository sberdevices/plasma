import React from 'react';
import styled, { css } from 'styled-components';
import { primary } from 'plasma-tokens';

const sizeMap = {
    s: 24,
    m: 36,
    l: 48,
};

export type IconSize = keyof typeof sizeMap;

export interface IconProps {
    size?: 's' | 'm' | 'l';
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
        width: ${sizeMap[$size]}px;
        height: ${sizeMap[$size]}px;
    `}
`;

export const IconRoot: React.FC<IconRootProps> = ({ icon: IconComponent, size = 'm', color, className }) => {
    return (
        <StyledRoot $size={size} className={className}>
            <IconComponent width={sizeMap[size]} height={sizeMap[size]} color={color || primary} />
        </StyledRoot>
    );
};
