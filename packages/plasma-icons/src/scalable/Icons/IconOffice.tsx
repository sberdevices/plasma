import React from 'react';

import { Office } from '../Icon.assets/Office';
import { IconRoot, IconProps } from '../IconRoot';

export const IconOffice: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Office} />;
};
