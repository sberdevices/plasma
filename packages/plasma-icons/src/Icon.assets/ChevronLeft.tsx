import React from 'react';

import { IconProps } from '../IconRoot';

export const ChevronLeft: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.651 3.356a1.235 1.235 0 010 1.72L9.874 12l6.777 6.924a1.235 1.235 0 010 1.72 1.173 1.173 0 01-1.683 0l-7.62-7.784A1.23 1.23 0 017 12c0-.322.125-.632.349-.86l7.619-7.784a1.173 1.173 0 011.683 0z"
            fill="currentColor"
        />
    </svg>
);
