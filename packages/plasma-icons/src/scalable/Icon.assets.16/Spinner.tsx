import React from 'react';

import { IconProps } from '../IconRoot';

export const Spinner: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path opacity="0.32" d="M12.9467 12.9467C11.682 14.216 9.932 15 8 15C4.136 15 1 11.864 1 8C1 4.136 4.136 1 8 1C11.864 1 15 4.136 15 8" stroke="url(#paint0Angular726149)" strokeWidth="2" strokeLinecap="round"/><defs><radialGradient id="paint0Angular726149" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8 8) scale(7)"><stop offset="0.0940661" stopColor="white" stopOpacity="0.01"/><stop offset="1" stopColor="white"/></radialGradient></defs>
    </svg>
);
