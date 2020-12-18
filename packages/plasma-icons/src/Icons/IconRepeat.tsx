import React from 'react';

import { Repeat } from '../Icon.assets/Repeat';
import { IconRoot, IconProps } from '../IconRoot';

export const IconRepeat: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Repeat} />;
};
