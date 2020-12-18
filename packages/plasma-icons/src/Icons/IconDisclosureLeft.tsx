import React from 'react';

import { DisclosureLeft } from '../Icon.assets/DisclosureLeft';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDisclosureLeft: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={DisclosureLeft} />;
};
