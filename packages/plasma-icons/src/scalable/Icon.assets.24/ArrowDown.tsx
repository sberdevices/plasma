import React from 'react';

import { IconProps } from '../IconRoot';

export const ArrowDown: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 4.99953L11 16.1695L6.11997 11.2895C5.72997 10.8995 5.08997 10.8995 4.69997 11.2895C4.30997 11.6795 4.30997 12.3095 4.69997 12.6995L11.29 19.2895C11.68 19.6795 12.31 19.6795 12.7 19.2895L19.29 12.6995C19.68 12.3095 19.68 11.6795 19.29 11.2895C18.9 10.8995 18.27 10.8995 17.88 11.2895L13 16.1695L13 4.99953C13 4.44953 12.55 3.99953 12 3.99953C11.45 3.99953 11 4.44953 11 4.99953Z"
            fill="currentColor"
        />
    </svg>
);
