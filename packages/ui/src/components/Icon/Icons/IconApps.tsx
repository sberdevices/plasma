import React from 'react';

import { Apps } from '../Icon.assets/Apps';
import { IconRoot, IconProps } from '../IconRoot';

export const IconApps: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Apps} />;
};
