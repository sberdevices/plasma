import React from 'react';

import { Cardstack } from '../Icon.assets/Cardstack';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCardstack: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Cardstack} />;
};
