import React from 'react';

import { Gamepad } from '../Icon.assets/Gamepad';
import { IconRoot, IconProps } from '../IconRoot';

export const IconGamepad: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Gamepad} />;
};
