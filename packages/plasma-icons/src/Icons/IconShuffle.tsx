import React from 'react';

import { Shuffle } from '../Icon.assets/Shuffle';
import { IconRoot, IconProps } from '../IconRoot';

export const IconShuffle: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Shuffle} />;
};
