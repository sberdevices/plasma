import React from 'react';
import { IconProps } from '@sberdevices/plasma-icons';
import { accent } from '@sberdevices/plasma-tokens';

export const LocationIcon: React.FC<IconProps> = (props) => (
    <svg width="42" height="60" viewBox="0 0 42 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 21C0 9.40202 9.40202 0 21 0C32.598 0 42 9.40202 42 21C42 32.2628 33.1336 41.4547 22 41.9766V59C22 59.5523 21.5523 60 21 60C20.4477 60 20 59.5523 20 59V41.9766C8.86637 41.4547 0 32.2628 0 21ZM12 21C12 16.0294 16.0294 12 21 12C25.9706 12 30 16.0294 30 21C30 25.9706 25.9706 30 21 30C16.0294 30 12 25.9706 12 21Z"
            fill={accent}
        />
    </svg>
);
