import React from 'react';

import { IconAsset } from '../IconRoot';

export const HeartStroke: React.FC<IconAsset> = (props) => (
    <svg width="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            clipRule="evenodd"
            d="M11.5 6.585C7.298 1.687 4.047 5.07 3.497 6.08c-1 1.868-.4 4.697 1 6.06l5.228 5.277a2.5 2.5 0 003.552 0l5.227-5.277c1.4-1.363 2-4.19.999-6.06-.55-1.01-4.002-4.393-8.003.505z"
            stroke="currentColor"
            strokeWidth={2}
        />
    </svg>
);
