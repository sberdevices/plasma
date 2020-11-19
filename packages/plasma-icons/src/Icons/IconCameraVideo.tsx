import React from 'react';

import { CameraVideo } from '../Icon.assets/CameraVideo';
import { IconRoot, IconProps } from '../IconRoot';

export const IconCameraVideo: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={CameraVideo} />;
};
