import React from 'react';

import { Copy } from '../Icon.assets/Copy';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCopy: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Copy} />;
};
