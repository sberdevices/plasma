import React from 'react';

import { IconProps } from '../IconRoot';

export const Warning: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M10.875 16.875a1.125 1.125 0 102.25 0 1.125 1.125 0 00-2.25 0zm.375-7.125v4.313c0 .103.085.187.188.187h1.125a.188.188 0 00.187-.188V9.75a.188.188 0 00-.187-.188h-1.125a.188.188 0 00-.188.188zM22.4 20.063L12.65 3.188a.741.741 0 00-.65-.376.739.739 0 00-.65.376L1.6 20.063a.75.75 0 00.65 1.125h19.5a.75.75 0 00.65-1.125zm-18.364-.654L12 5.623l7.964 13.786H4.036z"
            fill="currentColor"
        />
    </svg>
);
