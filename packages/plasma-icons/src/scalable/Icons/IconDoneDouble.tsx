import React from 'react';

import { DoneDouble } from '../Icon.assets/DoneDouble';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDoneDouble: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={DoneDouble} />;
};
