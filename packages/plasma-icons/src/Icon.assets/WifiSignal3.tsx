import React from 'react';

import { IconProps } from '../IconRoot';

export const WifiSignal3: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 10.214a7.799 7.799 0 00-5.54 2.303 1 1 0 001.417 1.411A5.798 5.798 0 0112 12.214c1.61 0 3.066.654 4.123 1.714a1 1 0 101.417-1.411A7.799 7.799 0 0012 10.214zm0 10.146a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
            fill="currentColor"
        />
        <path
            opacity={0.3}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 6.5a11.464 11.464 0 00-8.149 3.388 1 1 0 11-1.417-1.412A13.464 13.464 0 0112 4.5c3.737 0 7.12 1.52 9.566 3.976a1 1 0 11-1.416 1.412A11.464 11.464 0 0012 6.5z"
            fill="currentColor"
        />
    </svg>
);
