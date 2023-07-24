import React from 'react';

import { IconProps } from '../IconRoot';

export const Block: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.0391 26.4533C23.1316 28.0434 20.6775 29 18 29C11.9249 29 7 24.0751 7 18C7 15.3225 7.95662 12.8684 9.54673 10.9609L25.0391 26.4533ZM26.4533 25.0391L10.9609 9.54673C12.8684 7.95662 15.3225 7 18 7C24.0751 7 29 11.9249 29 18C29 20.6775 28.0434 23.1316 26.4533 25.0391ZM31 18C31 25.1797 25.1797 31 18 31C10.8203 31 5 25.1797 5 18C5 10.8203 10.8203 5 18 5C25.1797 5 31 10.8203 31 18Z"
            fill="currentColor"
        />
    </svg>
);
