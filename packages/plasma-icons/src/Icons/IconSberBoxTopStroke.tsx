import React from 'react';

import { SberBoxTopStroke } from '../Icon.assets/SberBoxTopStroke';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSberBoxTopStroke: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SberBoxTopStroke} />;
};
