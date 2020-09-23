import React from 'react';
import styled, { css } from 'styled-components';

import cart from './Icon.assets/cart.svg';
import chevronLeft from './Icon.assets/chevron-left.svg';
import clock from './Icon.assets/clock.svg';
import done from './Icon.assets/done.svg';
import hotel from './Icon.assets/hotel.svg';
import minus from './Icon.assets/minus.svg';
import paper from './Icon.assets/paper.svg';
import plus from './Icon.assets/plus.svg';
import forward from './Icon.assets/forward.svg';
import pause from './Icon.assets/pause.svg';
import play from './Icon.assets/play.svg';
import replay from './Icon.assets/replay.svg';
import skipNext from './Icon.assets/skip-next.svg';
import skipPrevious from './Icon.assets/skip-previous.svg';
import plaint from './Icon.assets/plaint.svg';

const iconSet = {
    cart,
    chevronLeft,
    clock,
    done,
    hotel,
    minus,
    paper,
    plus,
    skipPrevious,
    replay,
    pause,
    play,
    forward,
    skipNext,
    plaint,
};

const sizeMap = {
    s: 24,
    m: 36,
    l: 48,
};

export type IconSize = keyof typeof sizeMap;

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

        width: ${props.size}px;
        height: ${props.size}px;

        background-image: url('${iconSet[props.icon]}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    `}
`;

export const Icon: React.FC<IconProps> = ({ icon, size = 'm', className }) => {
    return <StyledRoot className={className} icon={icon} size={sizeMap[size]} />;
};

export { iconSet };
