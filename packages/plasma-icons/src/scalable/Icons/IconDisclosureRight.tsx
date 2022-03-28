import React from 'react';

import { DisclosureRight } from '../Icon.assets/DisclosureRight';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDisclosureRight: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={DisclosureRight} />;
};
