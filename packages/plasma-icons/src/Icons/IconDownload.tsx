import React from 'react';

import { Download } from '../Icon.assets/Download';
import { IconRoot, IconProps } from '../IconRoot';

export const IconDownload: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={Download} />;
};
