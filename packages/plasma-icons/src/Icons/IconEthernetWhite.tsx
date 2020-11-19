import React from 'react';

import { EthernetWhite } from '../Icon.assets/EthernetWhite';
import { IconRoot, IconProps } from '../IconRoot';

export const IconEthernetWhite: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={EthernetWhite} />;
};
