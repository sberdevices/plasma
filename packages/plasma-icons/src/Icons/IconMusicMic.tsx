import React from 'react';

import { MusicMic } from '../Icon.assets/MusicMic';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMusicMic: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={MusicMic} />;
};
