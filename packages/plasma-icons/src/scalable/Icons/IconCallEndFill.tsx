import React from 'react';

import { CallEndFill } from '../Icon.assets/CallEndFill';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCallEndFill: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={CallEndFill} />;
};
