import React from 'react';

import { DisclosureDown } from '../Icon.assets/DisclosureDown';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDisclosureDown: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={DisclosureDown} />;
};
