import React from 'react';

import { GamepadAlt1 } from '../Icon.assets/GamepadAlt1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconGamepadAlt1: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={GamepadAlt1} />;
};
