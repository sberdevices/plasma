import React from 'react';

import { SberBoxTimeStroke } from '../Icon.assets/SberBoxTimeStroke';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSberBoxTimeStroke: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SberBoxTimeStroke} />;
};
