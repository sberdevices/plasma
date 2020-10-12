import React from 'react';

import { ReactComponent as AssistantPlaceholder } from '../Icon.assets/assistant-placeholder.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconAssistantPlaceholder: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={AssistantPlaceholder} />;
};
