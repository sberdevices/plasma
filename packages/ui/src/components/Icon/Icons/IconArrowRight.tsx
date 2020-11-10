import React from 'react';

import { ArrowRight } from '../Icon.assets/ArrowRight';
import { IconRoot, IconProps } from '../IconRoot';

export const IconArrowRight: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={ArrowRight} />;
};
