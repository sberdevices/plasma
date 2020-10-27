import React from 'react';

import { Text } from '../Icon.assets/Text';
import { IconRoot, IconProps } from '../IconRoot';

export const IconText: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Text} />;
};
