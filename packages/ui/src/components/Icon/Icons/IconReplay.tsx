import React from 'react';

import { ReactComponent as Replay } from '../Icon.assets/replay.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconReplay: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Replay} />;
};
