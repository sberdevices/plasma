import React from 'react';
import styled, { css } from 'styled-components';
import { primary } from '@sberdevices/plasma-core';

import { iconSet16, IconSet16 } from './Icon.assets.16';
import { iconSet24, IconSet24 } from './Icon.assets.24';
import { iconSet36, IconSet36 } from './Icon.assets.36';

const sizeMap = {
    xs: {
        scale: 1,
        size: 16,
    }, // 16px
    s: {
        scale: 1.5,
        size: 24,
    }, // 24px
    m: {
        scale: 2.25,
        size: 36,
    }, // 36px
};

export type IconSetUnionSize = IconSet16 | IconSet24 | IconSet36;

export type IconSize = keyof typeof sizeMap;

export interface IconProps {
    size?: IconSize;
    color?: string;
    className?: string;
}

interface IconRootProps extends IconProps {
    size: IconSize;
    iconName: IconSetUnionSize;
}

const StyledRoot = styled.div<{ w: string }>`
    display: inline-flex;
    ${({ w }) => css`
        width: ${w};
        height: ${w};
        flex: 0 0 ${w};
    `}
`;

const hasOwnProperty = <T extends {}, Y extends PropertyKey>(
    obj: T,
    prop: Y,
): obj is T & Record<Y, React.FC<IconProps>> => Object.prototype.hasOwnProperty.call(obj, prop);

const getIconComponent = (iconName: IconSetUnionSize, size: number) => {
    if (size === 16 && hasOwnProperty(iconSet16, iconName)) {
        return iconSet16[iconName];
    }

    if (size === 24 && hasOwnProperty(iconSet24, iconName)) {
        return iconSet24[iconName];
    }

    if (size === 36 && hasOwnProperty(iconSet36, iconName)) {
        return iconSet36[iconName];
    }

    return (
        (hasOwnProperty(iconSet16, iconName) && iconSet16[iconName]) ||
        (hasOwnProperty(iconSet24, iconName) && iconSet24[iconName]) ||
        (hasOwnProperty(iconSet36, iconName) && iconSet36[iconName])
    );
};

export const IconRoot: React.FC<IconRootProps> = ({ iconName, size, color, className }) => {
    const c = color || primary;

    const w = `${sizeMap[size].scale}rem`;

    const IconComponent = getIconComponent(iconName, sizeMap[size].size);

    return (
        <StyledRoot w={w} className={className}>
            {IconComponent && <IconComponent color={c} size={size} />}
        </StyledRoot>
    );
};
