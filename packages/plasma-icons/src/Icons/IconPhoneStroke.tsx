import React from 'react';

import { PhoneStroke } from '../Icon.assets/PhoneStroke';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPhoneStroke: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={PhoneStroke} />;
};
