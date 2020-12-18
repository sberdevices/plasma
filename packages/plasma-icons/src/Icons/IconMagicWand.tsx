import React from 'react';

import { MagicWand } from '../Icon.assets/MagicWand';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMagicWand: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={MagicWand} />;
};
