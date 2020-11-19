import React from 'react';

import { IconAsset } from '../IconRoot';

export const NavigationArrow: React.FC<IconAsset> = (props) => (
    <svg width="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M17.78 4.914L5.812 9.842c-.892.368-.798 1.661.138 1.895l4.469 1.117a1 1 0 01.728.728l1.117 4.469c.234.936 1.527 1.03 1.895.138l4.928-11.97c.339-.822-.483-1.644-1.305-1.305z"
            fill="currentColor"
        />
    </svg>
);
