import React from 'react';

import { Accessibility } from '../Icon.assets/Accessibility';
import { IconRoot, IconProps } from '../IconRoot';

export const IconAccessibility: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Accessibility} />;
};
