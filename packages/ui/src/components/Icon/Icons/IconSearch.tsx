import React from 'react';

import { ReactComponent as Search } from '../Icon.assets/search.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSearch: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Search} />;
};
