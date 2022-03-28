import React from 'react';

import { IconProps } from '../IconRoot';

export const ChevronUp: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L13.7071 10.2929C14.0976 10.6834 14.0976 11.3166 13.7071 11.7071C13.3166 12.0976 12.6834 12.0976 12.2929 11.7071L8 7.41421L3.70711 11.7071C3.31658 12.0976 2.68342 12.0976 2.29289 11.7071C1.90237 11.3166 1.90237 10.6834 2.29289 10.2929L7.29289 5.29289Z" fill="currentColor" />
    </svg>
);
