import React from 'react';

import { IconProps } from '../IconRoot';

export const Close: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M5 19L19 5M5 5l14 14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
);
