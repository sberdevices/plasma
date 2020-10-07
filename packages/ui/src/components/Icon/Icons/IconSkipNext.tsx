import React from 'react';

import { ReactComponent as SkipNext } from '../Icon.assets/skip-next.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconSkipNext: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={SkipNext} />;
};
