import React from 'react';

import { Maximize } from '../Icon.assets/Maximize';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMaximize: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Maximize} />;
};
