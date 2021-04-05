import React from 'react';
import styled, { css } from 'styled-components';
import { primary } from '@sberdevices/plasma-core/tokens';

const sizeMap = {
    xs: 1, // 16px
    s: 1.5, // 24px
    // m: 2.25, // 36px
    // l: 3, // 48px
    // xl: 3.5, // 56px
    // xxl: 4, // 64px
};

export type IconSize = keyof typeof sizeMap;

export interface IconProps {
    size?: IconSize;
    color?: string;
    className?: string;
}

interface IconRootProps extends IconProps {
    size: IconSize;
    icon: React.FC<IconProps>;
}

const StyledRoot = styled.div<{ w: string }>`
    display: inline-flex;
    ${({ w }) => css`
        width: ${w};
        height: ${w};
        flex: 0 0 ${w};
    `}
`;

export const IconRoot: React.FC<IconRootProps> = ({ icon: IconComponent, size, color, className }) => {
    const c = color || primary;

    const w = `${sizeMap[size]}rem`;

    return (
        <StyledRoot w={w} className={className}>
            <IconComponent color={c} size={size} />
        </StyledRoot>
    );
};
