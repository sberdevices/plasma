import React from 'react';

import { Tv } from '../Icon.assets/Tv';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTv: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Tv} />;
};
