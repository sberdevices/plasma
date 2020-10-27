import React from 'react';

import { Bubble } from '../Icon.assets/Bubble';
import { IconRoot, IconProps } from '../IconRoot';

export const IconBubble: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Bubble} />;
};
