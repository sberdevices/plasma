import React from 'react';

import { IconProps } from '../IconRoot';

export const Ticket: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.679 14.698L14.365 1.012c.091-.091.32-.136.459.003l2.262 2.262c-1.003 1.095-.901 2.748.16 3.81a2.823 2.823 0 003.81.16l2.216 2.217c.139.138.14.413.05.505L9.634 23.655c-.136.136-.366.09-.505-.05L6.914 21.39a2.823 2.823 0 00-.16-3.81c-1.062-1.062-2.76-1.118-3.81-.16L.682 15.156c-.139-.139-.14-.322-.003-.459zm8.63-4.388l2.456 1.206 1.968-1.968-.534 2.73 2.41 1.161-2.684.486-.534 2.731-1.16-2.409-2.683.486 1.968-1.969L9.31 10.31z"
            fill="url(#mc_24_ticket_svg__paint0_linear)"
        />
        <defs>
            <linearGradient
                id="mc_24_ticket_svg__paint0_linear"
                x1={-0.21}
                y1={10.502}
                x2={7.611}
                y2={23.574}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F1FF00" />
                <stop offset={1} stopColor="#FFC23F" />
            </linearGradient>
        </defs>
    </svg>
);
