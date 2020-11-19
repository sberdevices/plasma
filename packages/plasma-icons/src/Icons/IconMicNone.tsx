import React from 'react';

import { MicNone } from '../Icon.assets/MicNone';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMicNone: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={MicNone} />;
};
