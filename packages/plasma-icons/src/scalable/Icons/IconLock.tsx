import React from 'react';

import { Lock } from '../Icon.assets/Lock';
import { IconRoot, IconProps } from '../IconRoot';

export const IconLock: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Lock} />;
};
