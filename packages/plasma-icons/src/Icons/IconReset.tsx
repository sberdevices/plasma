import React from 'react';

import { Reset } from '../Icon.assets/Reset';
import { IconRoot, IconProps } from '../IconRoot';

export const IconReset: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Reset} />;
};
