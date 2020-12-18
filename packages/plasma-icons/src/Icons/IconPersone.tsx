import React from 'react';

import { Persone } from '../Icon.assets/Persone';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPersone: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Persone} />;
};
