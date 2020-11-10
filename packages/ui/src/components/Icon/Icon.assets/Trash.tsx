import React from 'react';

import { IconAsset } from '../IconRoot';

export const Trash: React.FC<IconAsset> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 5.5A2.5 2.5 0 0110.5 3h3A2.5 2.5 0 0116 5.5V6h-2v-.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5V6H8v-.5zM4 8a1 1 0 011-1h14a1 1 0 110 2h-1v9.5a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 016 18.5V9H5a1 1 0 01-1-1zm4 10.5V9h8v9.5a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5z"
            fill="currentColor"
        />
    </svg>
);
