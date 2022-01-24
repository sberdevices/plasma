import React from 'react';

import { PhoneWiFi } from '../Icon.assets/PhoneWiFi';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPhoneWiFi: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={PhoneWiFi} />;
};
