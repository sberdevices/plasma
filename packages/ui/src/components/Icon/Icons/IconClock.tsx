import React from 'react';

import { ReactComponent as Clock } from '../Icon.assets/clock.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconClock: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Clock} />;
};
