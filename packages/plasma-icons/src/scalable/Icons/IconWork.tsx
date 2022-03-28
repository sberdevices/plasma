import React from 'react';

import { Work } from '../Icon.assets/Work';
import { IconRoot, IconProps } from '../IconRoot';

export const IconWork: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Work} />;
};
