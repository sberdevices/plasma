import React from 'react';

import { OutgoingCall } from '../Icon.assets/OutgoingCall';
import { IconRoot, IconProps } from '../IconRoot';

export const IconOutgoingCall: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={OutgoingCall} />;
};
