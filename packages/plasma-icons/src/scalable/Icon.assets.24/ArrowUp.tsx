import React from 'react';

import { IconProps } from '../IconRoot';

export const ArrowUp: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 19.0005L13 7.83047L17.88 12.7105C18.27 13.1005 18.91 13.1005 19.3 12.7105C19.69 12.3205 19.69 11.6905 19.3 11.3005L12.71 4.71047C12.32 4.32047 11.69 4.32047 11.3 4.71047L4.71003 11.3005C4.32003 11.6905 4.32003 12.3205 4.71003 12.7105C5.10003 13.1005 5.73003 13.1005 6.12003 12.7105L11 7.83047L11 19.0005C11 19.5505 11.45 20.0005 12 20.0005C12.55 20.0005 13 19.5505 13 19.0005Z"
            fill="currentColor"
        />
    </svg>
);
