import React from 'react';

import { PowerWire } from '../Icon.assets/PowerWire';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPowerWire: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={PowerWire} />;
};
