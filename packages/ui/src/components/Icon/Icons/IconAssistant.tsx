import React from 'react';

import { ReactComponent as Assistant } from '../Icon.assets/assistant.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconAssistant: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Assistant} />;
};
