import React from 'react';

import { ReactComponent as ChevronLeft } from '../Icon.assets/chevron-left.svg';
import { IconRoot, IconProps } from '../IconRoot';

export const IconChevronLeft: React.FC<IconProps> = ({ size, className }) => {
    return <IconRoot className={className} size={size} icon={ChevronLeft} />;
};
