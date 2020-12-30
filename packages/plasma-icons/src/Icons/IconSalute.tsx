import React from 'react';

import { Salute } from '../Icon.assets/Salute';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSalute: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Salute} />;
};
