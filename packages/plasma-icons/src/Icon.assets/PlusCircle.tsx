import React from 'react';

import { IconAsset } from '../IconRoot';

export const PlusCircle: React.FC<IconAsset> = (props) => (
    <svg width="1.5rem" viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.071 4.929c3.905 3.904 3.905 10.237 0 14.142-3.905 3.905-10.237 3.905-14.142 0-3.905-3.905-3.905-10.237 0-14.142 3.905-3.906 10.237-3.905 14.142 0zm-6.07 1.414a1 1 0 00-2.001 0V11H6.343c-.51 0-.93.381-.992.875L5.343 12a.997.997 0 001 1H11v4.657c0 .23.078.442.208.611l.085.096A.999.999 0 0013 17.657V13h4.657a1 1 0 00.992-.875l.008-.126a1 1 0 00-1-1h-4.656V6.343z"
            fill="currentColor"
        />
    </svg>
);
