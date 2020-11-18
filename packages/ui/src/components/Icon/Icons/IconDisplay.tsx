import React from 'react';

import { Display } from '../Icon.assets/Display';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDisplay: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Display} />;
};
