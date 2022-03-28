import React from 'react';

import { Doc } from '../Icon.assets/Doc';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDoc: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Doc} />;
};
