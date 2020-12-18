import React from 'react';

import { CallEnd } from '../Icon.assets/CallEnd';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCallEnd: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={CallEnd} />;
};
