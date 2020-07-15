import React from 'react';
import styled, { css } from 'styled-components';

import cart from './Icon.assets/cart.svg';
import done from './Icon.assets/done.svg';
import minus from './Icon.assets/minus.svg';
import paper from './Icon.assets/paper.svg';
import plus from './Icon.assets/plus.svg';

const iconSet = {
    cart,
    done,
    minus,
    paper,
    plus,
};

const sizeMap = {
    s: 24,
    m: 36,
    l: 48,
};

type IconSize = keyof typeof sizeMap;

export type IconName = keyof typeof iconSet;

export interface IconProps {
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
