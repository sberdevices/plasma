import React from 'react';

import { DisclosureRight } from '../Icon.assets/DisclosureRight';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDisclosureRight: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={DisclosureRight} />;
};
