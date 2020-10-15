import React from 'react';

import { Replay } from '../Icon.assets/Replay';
import { IconRoot, IconProps } from '../IconRoot';

export const IconReplay: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Replay} />;
};
