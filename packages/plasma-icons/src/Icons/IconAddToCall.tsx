import React from 'react';

import { AddToCall } from '../Icon.assets/AddToCall';
import { IconRoot, IconProps } from '../IconRoot';

export const IconAddToCall: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={AddToCall} />;
};
