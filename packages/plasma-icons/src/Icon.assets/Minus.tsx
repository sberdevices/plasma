import React from 'react';

import { IconProps } from '../IconRoot';

export const Minus: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" aria-busy="true" fill="none" {...props}>
        <rect x={21} y={11} width={2} height={18} rx={1} transform="rotate(90 21 11)" fill="currentColor" />
    </svg>
);
