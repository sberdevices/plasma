import React from 'react';

import { PictureFilled } from '../Icon.assets/PictureFilled';
import { IconRoot, IconProps } from '../IconRoot';

export const IconPictureFilled: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={PictureFilled} />;
};
