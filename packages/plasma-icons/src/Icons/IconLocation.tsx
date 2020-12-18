import React from 'react';

import { Location } from '../Icon.assets/Location';
import { IconRoot, IconProps } from '../IconRoot';

export const IconLocation: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Location} />;
};
