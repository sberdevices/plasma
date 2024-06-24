import React from 'react';

import { IconProps } from '../IconRoot';

export const PersonFill: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.25 7.72175C8.25 9.8085 9.92893 11.5 12 11.5C14.0711 11.5 15.75 9.8085 15.75 7.72175V6.77825C15.75 4.6915 14.0711 3 12 3C9.92893 3 8.25 4.6915 8.25 6.77825V7.72175ZM4 17.5C4 14.84 9.33 13.5 12 13.5C14.67 13.5 20 14.84 20 17.5V19.5C20 20.6046 19.1046 21.5 18 21.5H6C4.89543 21.5 4 20.6046 4 19.5V17.5Z"
            fill="currentColor"
        />
    </svg>
);
