import React from 'react';

import { StoreRemote } from '../Icon.assets/StoreRemote';
import { IconRoot, IconSize } from '../IconRoot';

interface IconProps {
    size?: IconSize;
    color?: string;
    className?: string;
}

export const IconStoreRemote: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={StoreRemote} />;
};
