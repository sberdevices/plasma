import React from 'react';

import { ReactComponent as Plaint } from '../Icon.assets/plaint.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPlaint: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Plaint} />;
};
