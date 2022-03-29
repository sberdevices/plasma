import React from 'react';

import { IconProps } from '../IconRoot';

export const MicFill: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 8.99999 3.34 8.99999 5V11C8.99999 12.66 10.34 14 12 14ZM17.91 11C17.42 11 17.01 11.36 16.93 11.85C16.52 14.2 14.47 16 12 16C9.52999 16 7.47999 14.2 7.06999 11.85C6.98999 11.36 6.57999 11 6.08999 11C5.47999 11 4.99999 11.54 5.08999 12.14C5.57999 15.14 7.97999 17.49 11 17.92V20C11 20.55 11.45 21 12 21C12.55 21 13 20.55 13 20V17.92C16.02 17.49 18.42 15.14 18.91 12.14C19.01 11.54 18.52 11 17.91 11Z"
            fill="currentColor"
        />
    </svg>
);
