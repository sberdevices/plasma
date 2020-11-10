import React from 'react';

import { DisclosureUp } from '../Icon.assets/DisclosureUp';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDisclosureUp: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={DisclosureUp} />;
};
