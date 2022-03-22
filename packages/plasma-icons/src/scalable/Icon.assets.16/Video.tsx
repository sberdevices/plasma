import React from 'react';

import { IconProps } from '../IconRoot';

export const Video: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 3C0.89543 3 0 3.89543 0 5V11.8291C0 12.9337 0.895432 13.8291 2 13.8291H9.37055C10.4751 13.8291 11.3706 12.9337 11.3706 11.8291V9.95734L13.3488 12.0787C14.2723 13.069 15.9315 12.4255 15.9457 11.0715L16.0032 5.61054C16.0171 4.29182 14.4448 3.59831 13.4803 4.49772L11.3706 6.46509V5C11.3706 3.89543 10.4751 3 9.37055 3H2Z"
            fill="currentColor"
        />
    </svg>
);
