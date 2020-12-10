import React from 'react';

import { Share } from '../Icon.assets/Share';
import { IconRoot, IconProps } from '../IconRoot';

export const IconShare: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Share} />;
};
