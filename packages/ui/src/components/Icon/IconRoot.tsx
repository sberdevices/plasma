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
    className?: string;
}

interface IconRootProps extends IconProps {
    icon: React.FC<IconAsset>;
}

export const IconRoot: React.FC<IconRootProps> = ({ icon: IconComponent, size, color, className }) => {
    const sizeVal = size ? ((`${sizeMap[size]}rem` as unknown) as number) : undefined;
    return <IconComponent width={sizeVal} height={sizeVal} color={color || primary} className={className} />;
};
