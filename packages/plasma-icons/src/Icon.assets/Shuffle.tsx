import React from 'react';

import { IconProps } from '../IconRoot';

export const Shuffle: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M18 15v-1.523a.5.5 0 01.83-.375l2.935 2.576a.497.497 0 01-.001.752l-2.935 2.56a.5.5 0 01-.829-.376V17h-1.555a6 6 0 01-4.736-2.316l-3.997-5.14A4 4 0 004.555 8H2V6h2.555A6 6 0 019.29 8.316l3.997 5.14A4 4 0 0016.445 15H18z"
            fill="currentColor"
        />
        <path
            d="M18 6V4.477a.5.5 0 01.83-.375l2.935 2.576a.499.499 0 01-.001.752l-2.935 2.56A.5.5 0 0118 9.614V8h-1.555a4 4 0 00-3.157 1.544l-3.997 5.14A6 6 0 014.555 17H2v-2h2.555a4 4 0 003.157-1.544l3.997-5.14A6 6 0 0116.445 6H18z"
            fill="currentColor"
        />
    </svg>
);
