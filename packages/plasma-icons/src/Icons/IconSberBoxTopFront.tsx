import React from 'react';

import { SberBoxTopFront } from '../Icon.assets/SberBoxTopFront';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSberBoxTopFront: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SberBoxTopFront} />;
};
