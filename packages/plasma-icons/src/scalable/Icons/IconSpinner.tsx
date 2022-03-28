import React from 'react';

import { Spinner } from '../Icon.assets/Spinner';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSpinner: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Spinner} />;
};
