import React from 'react';

import { BluetoothDisabled } from '../Icon.assets/BluetoothDisabled';
import { IconRoot, IconProps } from '../IconRoot';

export const IconBluetoothDisabled: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={BluetoothDisabled} />;
};
