import React from 'react';

import { ReactComponent as AssistantPlaceholder } from '../Icon.assets/assistant-placeholder.svg';
import { IconRoot } from '../IconRoot';

interface IconProps {
    size?: 's' | 'm' | 'l';
    color?: string;
    className?: string;
}

export const IconAssistantPlaceholder: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={AssistantPlaceholder} />;
};
