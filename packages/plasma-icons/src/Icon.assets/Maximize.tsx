import React from 'react';

import { IconProps } from '../IconRoot';

export const Maximize: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 5a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 11-2 0V6h-5a1 1 0 01-1-1zm-7 7a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 100-2H6v-5a1 1 0 00-1-1z"
            fill="currentColor"
        />
    </svg>
);
