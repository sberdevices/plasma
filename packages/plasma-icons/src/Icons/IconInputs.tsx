import React from 'react';

import { Inputs } from '../Icon.assets/Inputs';
import { IconRoot, IconProps } from '../IconRoot';

export const IconInputs: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Inputs} />;
};
