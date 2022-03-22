import React from 'react';

import { IconRoot, IconSetUnionSize, IconSize } from './IconRoot';

interface Props {
    icon: IconSetUnionSize;
    size?: IconSize;
    color?: string;
    className?: string;
}

export const Icon: React.FC<Props> = ({ icon, size, color, className }) => {
    return <IconRoot className={className} iconName={icon} size={size || 's'} color={color} />;
};
