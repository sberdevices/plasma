import React from 'react';

import { IconRoot } from './IconRoot';
import { Cart } from './Icon.assets/Cart';
import { ChevronLeft } from './Icon.assets/ChevronLeft';
import { Clock } from './Icon.assets/Clock';
import { Done } from './Icon.assets/Done';
import { Hotel } from './Icon.assets/Hotel';
import { Minus } from './Icon.assets/Minus';
import { Paper } from './Icon.assets/Paper';
import { Plus } from './Icon.assets/Plus';
import { Forward } from './Icon.assets/Forward';
import { Pause } from './Icon.assets/Pause';
import { Play } from './Icon.assets/Play';
import { Replay } from './Icon.assets/Replay';
import { SkipNext } from './Icon.assets/SkipNext';
import { SkipPrevious } from './Icon.assets/SkipPrevious';
import { Plaint } from './Icon.assets/Plaint';
import { Search } from './Icon.assets/Search';
import { Assistant } from './Icon.assets/Assistant';
import { AssistantPlaceholder } from './Icon.assets/AssistantPlaceholder';
import { Remove } from './Icon.assets/Remove';

const iconSet = {
    cart: Cart,
    chevronLeft: ChevronLeft,
    clock: Clock,
    done: Done,
    hotel: Hotel,
    minus: Minus,
    paper: Paper,
    plus: Plus,
    skipPrevious: SkipPrevious,
    replay: Replay,
    pause: Pause,
    play: Play,
    forward: Forward,
    skipNext: SkipNext,
    plaint: Plaint,
    search: Search,
    assistant: Assistant,
    assistantPlaceholder: AssistantPlaceholder,
    remove: Remove,
};

export type IconName = keyof typeof iconSet;

export interface IconProps {
    icon: IconName;
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, size, color, className }) => {
    return <IconRoot className={className} icon={iconSet[icon]} size={size} color={color} />;
};

export { iconSet };
