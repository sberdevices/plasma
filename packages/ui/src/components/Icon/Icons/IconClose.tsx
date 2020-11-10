import React from 'react';

import { Close } from '../Icon.assets/Close';
import { IconRoot, IconProps } from '../IconRoot';

export const IconClose: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Close} />;
};
