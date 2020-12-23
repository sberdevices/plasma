import React from 'react';

import { Feedback } from '../Icon.assets/Feedback';
import { IconRoot, IconProps } from '../IconRoot';

export const IconFeedback: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Feedback} />;
};
