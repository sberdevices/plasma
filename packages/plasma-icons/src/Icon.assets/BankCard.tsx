import React from 'react';

import { IconProps } from '../IconRoot';

export const BankCard: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 20h16a2 2 0 002-2v-8H2v8a2 2 0 002 2zM2 8V6a2 2 0 012-2h16a2 2 0 012 2v2H2z"
            fill="currentColor"
        />
    </svg>
);
