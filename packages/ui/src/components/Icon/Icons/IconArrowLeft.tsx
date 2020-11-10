import React from 'react';

import { ArrowLeft } from '../Icon.assets/ArrowLeft';
import { IconRoot, IconProps } from '../IconRoot';

export const IconArrowLeft: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={ArrowLeft} />;
};
