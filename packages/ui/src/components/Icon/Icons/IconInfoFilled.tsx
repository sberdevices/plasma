import React from 'react';

import { InfoFilled } from '../Icon.assets/InfoFilled';
import { IconRoot, IconProps } from '../IconRoot';

export const IconInfoFilled: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={InfoFilled} />;
};
