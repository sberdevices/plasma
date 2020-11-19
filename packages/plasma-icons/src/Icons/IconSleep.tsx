import React from 'react';

import { Sleep } from '../Icon.assets/Sleep';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSleep: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Sleep} />;
};
