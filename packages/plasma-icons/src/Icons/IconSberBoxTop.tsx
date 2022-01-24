import React from 'react';

import { SberBoxTop } from '../Icon.assets/SberBoxTop';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSberBoxTop: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SberBoxTop} />;
};
