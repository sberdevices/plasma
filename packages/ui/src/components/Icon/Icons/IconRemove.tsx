import React from 'react';

import { ReactComponent as Remove } from '../Icon.assets/remove.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconRemove: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Remove} />;
};
