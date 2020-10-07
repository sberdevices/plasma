import React from 'react';

import { ReactComponent as Forward } from '../Icon.assets/forward.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconForward: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Forward} />;
};
