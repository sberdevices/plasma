import React from 'react';

import { SberPortal } from '../Icon.assets/SberPortal';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSberPortal: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SberPortal} />;
};
