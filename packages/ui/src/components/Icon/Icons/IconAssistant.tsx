import React from 'react';

import { ReactComponent as Assistant } from '../Icon.assets/assistant.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconAssistant: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Assistant} />;
};
