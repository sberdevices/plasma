import React from 'react';

import { IconProps } from '../IconRoot';

export const DisplayOutline: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 9.2H30C30.9941 9.2 31.8 10.0059 31.8 11V22.7143C31.8 23.7084 30.9941 24.5143 30 24.5143H6C5.00589 24.5143 4.2 23.7084 4.2 22.7143V11C4.2 10.0059 5.00589 9.2 6 9.2ZM2 11C2 8.79086 3.79086 7 6 7H30C32.2091 7 34 8.79086 34 11V22.7143C34 24.9234 32.2091 26.7143 30 26.7143H25.9797C25.9931 26.8076 26 26.903 26 27C26 28.1046 25.1046 29 24 29H12C10.8954 29 10 28.1046 10 27C10 26.903 10.0069 26.8076 10.0203 26.7143H6C3.79086 26.7143 2 24.9234 2 22.7143V11Z"
            fill="currentColor"
        />
    </svg>
);
