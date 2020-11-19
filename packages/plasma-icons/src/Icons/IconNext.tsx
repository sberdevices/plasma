import React from 'react';

import { Next } from '../Icon.assets/Next';
import { IconRoot, IconProps } from '../IconRoot';

export const IconNext: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Next} />;
};
