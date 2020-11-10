import React from 'react';

import { IconRoot, IconSize } from './IconRoot';
import { Apps } from './Icon.assets/Apps';
import { ArrowDown } from './Icon.assets/ArrowDown';
import { ArrowLeft } from './Icon.assets/ArrowLeft';
import { ArrowRight } from './Icon.assets/ArrowRight';
import { ArrowUp } from './Icon.assets/ArrowUp';
import { Avatar } from './Icon.assets/Avatar';
import { Calendar } from './Icon.assets/Calendar';
import { ChevronDown } from './Icon.assets/ChevronDown';
import { ChevronLeft } from './Icon.assets/ChevronLeft';
import { ChevronRight } from './Icon.assets/ChevronRight';
import { ChevronUp } from './Icon.assets/ChevronUp';
import { Clock } from './Icon.assets/Clock';
import { ClockFilled } from './Icon.assets/ClockFilled';
import { Close } from './Icon.assets/Close';
import { Cross } from './Icon.assets/Cross';
import { CrossCircle } from './Icon.assets/CrossCircle';
import { CrossSmall } from './Icon.assets/CrossSmall';
import { DisclosureDown } from './Icon.assets/DisclosureDown';
import { DisclosureLeft } from './Icon.assets/DisclosureLeft';
import { DisclosureRight } from './Icon.assets/DisclosureRight';
import { DisclosureUp } from './Icon.assets/DisclosureUp';
import { Done } from './Icon.assets/Done';
import { Download } from './Icon.assets/Download';
import { Edit } from './Icon.assets/Edit';
import { Event } from './Icon.assets/Event';
import { House } from './Icon.assets/House';
import { HouseSbol } from './Icon.assets/HouseSbol';
import { Login } from './Icon.assets/Login';
import { Logout } from './Icon.assets/Logout';
import { Maximize } from './Icon.assets/Maximize';
import { Minus } from './Icon.assets/Minus';
import { MoreHorizontal } from './Icon.assets/MoreHorizontal';
import { MoreVertical } from './Icon.assets/MoreVertical';
import { Persone } from './Icon.assets/Persone';
import { Plus } from './Icon.assets/Plus';
import { PlusCircle } from './Icon.assets/PlusCircle';
import { Search } from './Icon.assets/Search';
import { Settings } from './Icon.assets/Settings';
import { Spinner } from './Icon.assets/Spinner';
import { Trash } from './Icon.assets/Trash';
import { TrashFilled } from './Icon.assets/TrashFilled';

const iconSet = {
    apps: Apps,
    arrowDown: ArrowDown,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    arrowUp: ArrowUp,
    avatar: Avatar,
    calendar: Calendar,
    chevronDown: ChevronDown,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    chevronUp: ChevronUp,
    clock: Clock,
    clockFilled: ClockFilled,
    close: Close,
    cross: Cross,
    crossCircle: CrossCircle,
    crossSmall: CrossSmall,
    disclosureDown: DisclosureDown,
    disclosureLeft: DisclosureLeft,
    disclosureRight: DisclosureRight,
    disclosureUp: DisclosureUp,
    done: Done,
    download: Download,
    edit: Edit,
    event: Event,
    house: House,
    houseSbol: HouseSbol,
    login: Login,
    logout: Logout,
    maximize: Maximize,
    minus: Minus,
    moreHorizontal: MoreHorizontal,
    moreVertical: MoreVertical,
    persone: Persone,
    plus: Plus,
    plusCircle: PlusCircle,
    search: Search,
    settings: Settings,
    spinner: Spinner,
    trash: Trash,
    trashFilled: TrashFilled,
};

export type IconName = keyof typeof iconSet;

export interface IconProps {
    icon: IconName;
    size?: IconSize;
    color?: string;
    className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, size, color, className }) => {
    return <IconRoot className={className} icon={iconSet[icon]} size={size} color={color} />;
};

export { iconSet };
