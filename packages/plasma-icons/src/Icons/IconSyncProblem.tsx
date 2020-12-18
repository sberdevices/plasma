import React from 'react';

import { SyncProblem } from '../Icon.assets/SyncProblem';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSyncProblem: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={SyncProblem} />;
};
