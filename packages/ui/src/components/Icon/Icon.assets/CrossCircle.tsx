import React from 'react';

import { IconAsset } from '../IconRoot';

export const CrossCircle: React.FC<IconAsset> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2c5.522 0 10 4.477 10 10s-4.478 10-10 10S2 17.523 2 12 6.478 2 12 2zM8.707 7.292a1 1 0 00-1.414 1.415L10.586 12l-3.293 3.293a.999.999 0 00-.083 1.32l.083.094a.997.997 0 001.414 0L12 13.414l3.293 3.293a.996.996 0 00.58.285L16 17a.999.999 0 00.707-1.707L13.414 12l3.293-3.293a1 1 0 00.083-1.32l-.083-.095a1 1 0 00-1.414 0L12 10.585 8.707 7.292z"
            fill="currentColor"
        />
    </svg>
);
