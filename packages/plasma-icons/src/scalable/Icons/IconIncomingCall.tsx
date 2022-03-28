import React from 'react';

import { IncomingCall } from '../Icon.assets/IncomingCall';
import { IconRoot, IconProps } from '../IconRoot';

export const IconIncomingCall: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={IncomingCall} />;
};
