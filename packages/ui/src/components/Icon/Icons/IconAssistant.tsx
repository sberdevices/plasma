import React from 'react';

import { Assistant } from '../Icon.assets/Assistant';
import { IconRoot, IconProps } from '../IconRoot';

export const IconAssistant: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Assistant} />;
};
