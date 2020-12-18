import React from 'react';

import { Event } from '../Icon.assets/Event';
import { IconRoot, IconProps } from '../IconRoot';

export const IconEvent: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Event} />;
};
