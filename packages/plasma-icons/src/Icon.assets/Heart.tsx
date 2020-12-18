import React from 'react';

import { IconProps } from '../IconRoot';

export const Heart: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 6.059C6.995.262 3.122 4.266 2.467 5.462c-1.192 2.21-.477 5.557 1.192 7.171l5.686 5.703a3.75 3.75 0 005.312 0l5.686-5.703c1.667-1.614 2.382-4.96 1.19-7.171-.656-1.196-4.767-5.2-9.533.597z"
            fill="currentColor"
        />
    </svg>
);
