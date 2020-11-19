import React from 'react';

import { Call } from '../Icon.assets/Call';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCall: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Call} />;
};
