import React from 'react';

import { ReactComponent as Done } from '../Icon.assets/done.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDone: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={Done} />;
};
