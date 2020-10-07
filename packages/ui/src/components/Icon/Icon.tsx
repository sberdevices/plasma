import React from 'react';

import { IconRoot } from './IconRoot';
import { ReactComponent as Cart } from './Icon.assets/cart.svg';
import { ReactComponent as ChevronLeft } from './Icon.assets/chevron-left.svg';
import { ReactComponent as Clock } from './Icon.assets/clock.svg';
import { ReactComponent as Done } from './Icon.assets/done.svg';
import { ReactComponent as Hotel } from './Icon.assets/hotel.svg';
import { ReactComponent as Minus } from './Icon.assets/minus.svg';
import { ReactComponent as Paper } from './Icon.assets/paper.svg';
import { ReactComponent as Plus } from './Icon.assets/plus.svg';
import { ReactComponent as Forward } from './Icon.assets/forward.svg';
import { ReactComponent as Pause } from './Icon.assets/pause.svg';
import { ReactComponent as Play } from './Icon.assets/play.svg';
import { ReactComponent as Replay } from './Icon.assets/replay.svg';
import { ReactComponent as SkipNext } from './Icon.assets/skip-next.svg';
import { ReactComponent as SkipPrevious } from './Icon.assets/skip-previous.svg';
import { ReactComponent as Plaint } from './Icon.assets/plaint.svg';
import { ReactComponent as Search } from './Icon.assets/search.svg';
import { ReactComponent as Assistant } from './Icon.assets/assistant.svg';
import { ReactComponent as AssistantPlaceholder } from './Icon.assets/assistant-placeholder.svg';
import { ReactComponent as Remove } from './Icon.assets/remove.svg';

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

export const Icon: React.FC<IconProps> = ({ icon, size, className }) => {
    return <IconRoot className={className} icon={iconSet[icon]} size={size} />;
};

export { iconSet };
