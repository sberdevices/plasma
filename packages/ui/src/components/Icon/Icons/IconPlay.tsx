import React from 'react';

import { ReactComponent as Play } from '../Icon.assets/play.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPlay: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Play} />;
};
