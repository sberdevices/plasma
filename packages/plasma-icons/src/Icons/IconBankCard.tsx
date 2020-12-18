import React from 'react';

import { BankCard } from '../Icon.assets/BankCard';
import { IconRoot, IconProps } from '../IconRoot';

export const IconBankCard: React.FC<IconProps> = ({ size = 's', color, className }) => {
    return <IconRoot className={className} size={size} color={color} icon={BankCard} />;
};
