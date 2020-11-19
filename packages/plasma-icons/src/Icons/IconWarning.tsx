import React from 'react';

import { Warning } from '../Icon.assets/Warning';
import { IconRoot, IconProps } from '../IconRoot';

export const IconWarning: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Warning} />;
};
