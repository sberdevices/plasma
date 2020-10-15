import React from 'react';

import { SkipNext } from '../Icon.assets/SkipNext';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSkipNext: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SkipNext} />;
};
