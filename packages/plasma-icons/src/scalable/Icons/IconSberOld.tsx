import React from 'react';

import { SberOld } from '../Icon.assets/SberOld';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSberOld: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SberOld} />;
};
