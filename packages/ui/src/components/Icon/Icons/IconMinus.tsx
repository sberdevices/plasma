import React from 'react';

import { ReactComponent as Minus } from '../Icon.assets/minus.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMinus: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Minus} />;
};
