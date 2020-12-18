import React from 'react';

import { Keyboard } from '../Icon.assets/Keyboard';
import { IconRoot, IconProps } from '../IconRoot';

export const IconKeyboard: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Keyboard} />;
};
