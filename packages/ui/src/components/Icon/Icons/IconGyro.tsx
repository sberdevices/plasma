import React from 'react';

import { Gyro } from '../Icon.assets/Gyro';
import { IconRoot, IconProps } from '../IconRoot';

export const IconGyro: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Gyro} />;
};
