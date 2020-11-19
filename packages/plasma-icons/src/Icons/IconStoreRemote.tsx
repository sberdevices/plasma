import React from 'react';

import { StoreRemote } from '../Icon.assets/StoreRemote';
import { IconRoot, IconProps } from '../IconRoot';

export const IconStoreRemote: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={StoreRemote} />;
};
