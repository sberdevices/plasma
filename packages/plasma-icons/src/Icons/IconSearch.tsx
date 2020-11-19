import React from 'react';

import { Search } from '../Icon.assets/Search';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSearch: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Search} />;
};
