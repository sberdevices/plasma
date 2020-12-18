import React from 'react';

import { RemotesAndAccessoriesStroke } from '../Icon.assets/RemotesAndAccessoriesStroke';
import { IconRoot, IconProps } from '../IconRoot';

export const IconRemotesAndAccessoriesStroke: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={RemotesAndAccessoriesStroke} />;
};
