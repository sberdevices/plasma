import React from 'react';

import { RemotesAndAccessories } from '../Icon.assets/RemotesAndAccessories';
import { IconRoot, IconProps } from '../IconRoot';

export const IconRemotesAndAccessories: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={RemotesAndAccessories} />;
};
