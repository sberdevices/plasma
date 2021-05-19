import React from 'react';

import { PercentStroke } from '../Icon.assets/PercentStroke';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPercentStroke: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={PercentStroke} />;
};
