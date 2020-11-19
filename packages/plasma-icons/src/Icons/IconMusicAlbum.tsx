import React from 'react';

import { MusicAlbum } from '../Icon.assets/MusicAlbum';
import { IconRoot, IconProps } from '../IconRoot';

export const IconMusicAlbum: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={MusicAlbum} />;
};
