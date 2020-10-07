import React from 'react';

import { ReactComponent as Play } from '../Icon.assets/play.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconPlay: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Play} />;
};
