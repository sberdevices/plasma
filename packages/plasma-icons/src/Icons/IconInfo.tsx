import React from 'react';

import { Info } from '../Icon.assets/Info';
import { IconRoot, IconProps } from '../IconRoot';

export const IconInfo: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Info} />;
};
