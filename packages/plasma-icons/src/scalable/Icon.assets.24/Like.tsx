import React from 'react';

import { IconProps } from '../IconRoot';

export const Like: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g style={{ mixBlendMode: 'lighten' }}>
            <path
                d="M8 18C8.17255 18 14.2695 18 17.1984 18C18.108 18 18.8997 17.3862 19.1299 16.5062L20.3443 11.8642C20.6759 10.5967 19.7196 9.35803 18.4095 9.35803H13.2291L13.5568 8.81692C14.2935 7.60053 14.3364 6.08635 13.6697 4.83021C13.4572 4.42984 12.9093 4.36687 12.6115 4.70858L8 10"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 18H3.5V10H6.5V18ZM5 11C5.41421 11 5.75 11.3358 5.75 11.75C5.75 12.1642 5.41421 12.5 5 12.5C4.58579 12.5 4.25 12.1642 4.25 11.75C4.25 11.3358 4.58579 11 5 11Z"
                fill="currentColor"
                opacity="0.4"
            />
        </g>
    </svg>
);
