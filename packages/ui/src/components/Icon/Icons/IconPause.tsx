import React from 'react';

import { ReactComponent as Pause } from '../Icon.assets/pause.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPause: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Pause} />;
};
