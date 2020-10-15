import React from 'react';

import { SkipPrevious } from '../Icon.assets/SkipPrevious';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSkipPrevious: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SkipPrevious} />;
};
