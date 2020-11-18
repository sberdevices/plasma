import React from 'react';

import { Ticket } from '../Icon.assets/Ticket';
import { IconRoot, IconProps } from '../IconRoot';

export const IconTicket: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Ticket} />;
};
