import React from 'react';

import { BankCardAlt1 } from '../Icon.assets/BankCardAlt1';
import { IconRoot, IconProps } from '../IconRoot';

export const IconBankCardAlt1: React.FC<IconProps> = ({ size, color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={BankCardAlt1} />;
};
