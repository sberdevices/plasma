import React from 'react';

import { Language } from '../Icon.assets/Language';
import { IconRoot, IconProps } from '../IconRoot';

export const IconLanguage: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Language} />;
};
