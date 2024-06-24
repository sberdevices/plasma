import React from 'react';

import { IconProps } from '../IconRoot';

export const Open: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect
            x="3.8"
            y="3.8"
            width="16.4"
            height="16.4"
            rx="2.2"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="1.6"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.34375 8.625C8.34375 8.15901 8.72151 7.78125 9.1875 7.78125H15.375C15.841 7.78125 16.2188 8.15901 16.2188 8.625V14.8125C16.2188 15.2785 15.841 15.6562 15.375 15.6562C14.909 15.6562 14.5312 15.2785 14.5312 14.8125V10.662L9.22162 15.9716C8.89212 16.3011 8.35788 16.3011 8.02838 15.9716C7.69887 15.6421 7.69887 15.1079 8.02838 14.7784L13.338 9.46875H9.1875C8.72151 9.46875 8.34375 9.09099 8.34375 8.625Z"
            fill="currentColor"
        />
    </svg>
);
