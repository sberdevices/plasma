import React from 'react';

import { IconRoot } from './IconRoot';
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
import search from './Icon.assets/search.svg';
import assistant from './Icon.assets/assistant.svg';
import assistantPlaceholder from './Icon.assets/assistant-placeholder.svg';

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
    search,
    assistant,
    assistantPlaceholder,
};

export type IconName = keyof typeof iconSet;

export interface IconProps {
    icon: IconName;
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, size, className }) => {
    return <IconRoot className={className} icon={iconSet[icon]} size={size} />;
};

export { iconSet };
