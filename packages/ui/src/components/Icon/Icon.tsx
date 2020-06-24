import React from 'react';
import styled, { css } from 'styled-components';

import cart from './svg/cart.svg';
import done from './svg/done.svg';
import minus from './svg/minus.svg';
import plus from './svg/plus.svg';

const iconSet = {
    cart,
    done,
    minus,
    plus,
};

const sizeMap = {
    s: 16,
    m: 24,
    l: 32,
    xxl: 72,
};

type IconSize = keyof typeof sizeMap;

export type IconName = keyof typeof iconSet;

interface IconProps {
    icon: IconName;
    size?: IconSize;
    color?: string;
    className?: string;
}

interface StyledRootProps {
    size: number;
    icon: IconName;
}

const StyledRoot = styled.span<StyledRootProps>`
    ${(props) => css`
        display: inline-block;
        background-image: url('${iconSet[props.icon]}');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        display: inline-block;
        width: ${props.size}px;
        height: ${props.size}px;
    `}
`;

export const Icon: React.FC<IconProps> = ({ icon, size = 'm' }) => {
    return <StyledRoot icon={icon} size={sizeMap[size]} />;
};

export { iconSet };

export default Icon;
