import React from 'react';

import { IconRoot, IconProps } from '../IconRoot';

export const IconTvMode1Fill: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} iconName="tvMode1Fill" />;
};
