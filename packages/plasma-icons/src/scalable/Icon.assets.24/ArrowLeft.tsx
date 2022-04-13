import React from 'react';

import { IconProps } from '../IconRoot';

export const ArrowLeft: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.0024 13.0003L7.83242 13.0003L12.7124 17.8803C13.1024 18.2703 13.1024 18.9103 12.7124 19.3003C12.3224 19.6903 11.6924 19.6903 11.3024 19.3003L4.71242 12.7103C4.32242 12.3203 4.32242 11.6903 4.71242 11.3003L11.3024 4.71027C11.6924 4.32027 12.3224 4.32027 12.7124 4.71027C13.1024 5.10027 13.1024 5.73027 12.7124 6.12027L7.83242 11.0003L19.0024 11.0003C19.5524 11.0003 20.0024 11.4503 20.0024 12.0003C20.0024 12.5503 19.5524 13.0003 19.0024 13.0003Z"
            fill="currentColor"
        />
    </svg>
);
