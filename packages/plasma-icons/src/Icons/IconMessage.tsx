import React from 'react';

import { Message } from '../Icon.assets/Message';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMessage: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Message} />;
};
