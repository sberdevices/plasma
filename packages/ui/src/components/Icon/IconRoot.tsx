import React from 'react';
import styled, { css } from 'styled-components';

const sizeMap = {
    s: 24,
    m: 36,
    l: 48,
};

type IconSize = keyof typeof sizeMap;

interface IconRootProps {
    icon: React.ComponentType<React.SVGAttributes<SVGElement>>;
    size?: IconSize;
    className?: string;
    color?: string;
}

interface StyledRootProps {
    size: IconSize;
}

const StyledRoot = styled.span<StyledRootProps>`
    display: inline-block;

    ${({ size }) => css`
        width: ${sizeMap[size]}px;
        height: ${sizeMap[size]}px;
    `}
`;

export const IconRoot: React.FC<IconRootProps> = ({ icon: IconComponent, size = 'm', color, className }) => {
    return (
        <StyledRoot size={size} className={className}>
            <IconComponent width={sizeMap[size]} height={sizeMap[size]} fill={color} />
        </StyledRoot>
    );
};
