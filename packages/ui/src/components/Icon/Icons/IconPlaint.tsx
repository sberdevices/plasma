import React from 'react';

import { ReactComponent as Plaint } from '../Icon.assets/plaint.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPlaint: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Plaint} />;
};
