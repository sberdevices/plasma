import React from 'react';

import { IconProps } from '../IconRoot';

export const VerticalGalleryAlt2: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="2.75" y="4.75" width="10.5" height="14.5" rx="1.25" stroke="white" strokeWidth="1.5" />
        <mask id="path2Inside1184014217" fill="currentColor">
            <path d="M16 7C16 5.89543 16.8954 5 18 5H20.5C20.7761 5 21 5.22386 21 5.5V18.5C21 18.7761 20.7761 19 20.5 19H18C16.8954 19 16 18.1046 16 17V7Z" />
        </mask>
        <path
            d="M16 7C16 5.89543 16.8954 5 18 5H20.5C20.7761 5 21 5.22386 21 5.5V18.5C21 18.7761 20.7761 19 20.5 19H18C16.8954 19 16 18.1046 16 17V7Z"
            fill="currentColor"
            stroke="white"
            strokeWidth="3"
            mask="url(#path2Inside1184014217)"
        />
    </svg>
);
