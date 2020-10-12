import React from 'react';

import { ReactComponent as Done } from '../Icon.assets/done.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDone: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Done} />;
};
