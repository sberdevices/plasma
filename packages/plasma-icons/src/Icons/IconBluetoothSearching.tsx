import React from 'react';

import { BluetoothSearching } from '../Icon.assets/BluetoothSearching';
import { IconRoot, IconProps } from '../IconRoot';

export const IconBluetoothSearching: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={BluetoothSearching} />;
};
