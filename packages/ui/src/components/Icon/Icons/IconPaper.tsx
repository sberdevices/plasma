import React from 'react';

import paper from '../Icon.assets/paper.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconPaper: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={paper} />;
};
