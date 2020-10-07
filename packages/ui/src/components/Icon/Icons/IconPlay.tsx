import React from 'react';

import { ReactComponent as Play } from '../Icon.assets/play.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPlay: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Play} />;
};
