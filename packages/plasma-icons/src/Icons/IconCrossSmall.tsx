import React from 'react';

import { CrossSmall } from '../Icon.assets/CrossSmall';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCrossSmall: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={CrossSmall} />;
};
