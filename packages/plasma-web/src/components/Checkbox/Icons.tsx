import React from 'react';
import styled, { css } from 'styled-components';

const sizesRem = {
    xs: 1.125, // 18px
    s: 1.25, // 20px
};

const sizesPx = {
    xs: 18,
    s: 24,
};

interface SvgProps {
    size?: string | number;
    color?: string;
}

const DoneSvg: React.FC<SvgProps> = ({ size, color }) => (
    <svg width="100%" viewBox={`0 0 ${size} ${size}`} fill="none">
        <path
            fill={color}
            d="m5.70711,8.15582c-0.39053,-0.39052 -1.02369,-0.39052 -1.41422,0c-0.39052,0.39053 -0.39052,1.02369 0,1.41422l3.70666,3.70666l6.71095,-6.70248c0.3908,-0.39027 0.3912,-1.02344 0.0009,-1.41421c-0.3903,-0.39077 -1.02344,-0.39117 -1.41421,-0.00089l-5.29674,5.29004l-2.29334,-2.29334z"
        />
    </svg>
);
const IndeterminateSvg: React.FC<SvgProps> = ({ size, color }) => (
    <svg width="100%" viewBox={`0 0 ${size} ${size}`} fill="none">
        <path strokeLinecap="round" strokeWidth="2" stroke={color} d="m5.09449,9.0315l8,0" />
    </svg>
);

const StyledRoot = styled.div<{ size: string }>`
    display: inline-flex;

    ${({ size }) => css`
        width: ${size};
        height: ${size};
    `}
`;

interface IconProps {
    size?: keyof typeof sizesRem;
    color?: string;
    className?: string;
}

export const Done: React.FC<IconProps> = ({ size = 'xs', color = 'currentColor', className }) => {
    return (
        <StyledRoot size={`${sizesRem[size]}rem`} className={className}>
            <DoneSvg color={color} size={sizesPx[size]} />
        </StyledRoot>
    );
};

export const Indeterminate: React.FC<IconProps> = ({ size = 'xs', color = 'currentColor', className }) => {
    return (
        <StyledRoot size={`${sizesRem[size]}rem`} className={className}>
            <IndeterminateSvg color={color} size={sizesPx[size]} />
        </StyledRoot>
    );
};
