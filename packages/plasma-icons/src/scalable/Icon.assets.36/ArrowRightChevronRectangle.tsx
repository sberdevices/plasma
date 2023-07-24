import React from 'react';

import { IconProps } from '../IconRoot';

export const ArrowRightChevronRectangle: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 9H24V27H14C13.4477 27 13 27.4477 13 28C13 28.5523 13.4477 29 14 29H24C25.1051 29 26 28.1045 26 27V9C26 7.89552 25.1051 7 24 7H14C13.4477 7 13 7.44772 13 8C13 8.55228 13.4477 9 14 9ZM16.6021 19L14.3276 21.2963C13.939 21.6887 13.942 22.3218 14.3344 22.7105C14.7267 23.0991 15.3599 23.0961 15.7486 22.7037L19.7106 18.7037C20.0966 18.314 20.0966 17.686 19.7106 17.2963L15.7486 13.2963C15.3599 12.9039 14.7267 12.9009 14.3344 13.2895C13.942 13.6782 13.939 14.3113 14.3276 14.7037L16.6021 17H7C6.44772 17 6 17.4477 6 18C6 18.5523 6.44772 19 7 19H16.6021Z"
            fill="currentColor"
        />
    </svg>
);
