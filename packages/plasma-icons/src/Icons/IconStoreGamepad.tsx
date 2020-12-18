import React from 'react';

import { StoreGamepad } from '../Icon.assets/StoreGamepad';
import { IconRoot, IconProps } from '../IconRoot';

export const IconStoreGamepad: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={StoreGamepad} />;
};
