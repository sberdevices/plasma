import React from 'react';

import { SberBoxTime } from '../Icon.assets/SberBoxTime';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSberBoxTime: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SberBoxTime} />;
};
