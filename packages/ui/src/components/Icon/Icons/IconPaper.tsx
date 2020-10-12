import React from 'react';

import { ReactComponent as Paper } from '../Icon.assets/paper.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPaper: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Paper} />;
};
