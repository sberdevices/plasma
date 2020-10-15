import React from 'react';

import { AssistantPlaceholder } from '../Icon.assets/AssistantPlaceholder';
import { IconRoot, IconProps } from '../IconRoot';

export const IconAssistantPlaceholder: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={AssistantPlaceholder} />;
};
