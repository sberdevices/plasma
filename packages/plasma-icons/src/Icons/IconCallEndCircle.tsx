import React from 'react';

import { CallEndCircle } from '../Icon.assets/CallEndCircle';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCallEndCircle: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={CallEndCircle} />;
};
