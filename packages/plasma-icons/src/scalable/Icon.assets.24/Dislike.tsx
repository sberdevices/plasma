import React from 'react';

import { IconProps } from '../IconRoot';

export const Dislike: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g style={{ mixBlendMode: 'lighten' }}>
            <path
                d="M7.5 7C7.67255 7 13.7695 7 16.6984 7C17.608 7 18.3997 7.61381 18.6299 8.49381L19.8443 13.1358C20.1759 14.4033 19.2196 15.642 17.9095 15.642H12.7291L13.0568 16.1831C13.7935 17.3995 13.8364 18.9136 13.1697 20.1698C12.9572 20.5702 12.4093 20.6331 12.1115 20.2914L7.5 15"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 7H3V15H6V7ZM4.5 14C4.91421 14 5.25 13.6642 5.25 13.25C5.25 12.8358 4.91421 12.5 4.5 12.5C4.08579 12.5 3.75 12.8358 3.75 13.25C3.75 13.6642 4.08579 14 4.5 14Z"
                fill="currentColor"
                opacity="0.4"
            />
        </g>
    </svg>
);
