import React from 'react';

import { IconProps } from '../IconRoot';

export const Alarm: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g filter="url(#ic_24_alarm_svg__filter0_b)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.758 3.791L3.654 6.379a1 1 0 01-1.415-.131 1.011 1.011 0 01.121-1.426l3.114-2.588a1 1 0 011.416.131 1.003 1.003 0 01-.132 1.426zm14.165 1.031L17.81 2.234a1.012 1.012 0 00-1.425.131 1.021 1.021 0 00.131 1.426l3.104 2.588a1.012 1.012 0 001.425-.131 1.011 1.011 0 00-.12-1.426zm-18.38 8.079a9.1 9.1 0 1118.2.001 9.1 9.1 0 01-18.2-.001zm7.623 1.547l4.448-4.47a.763.763 0 011.072 0 .763.763 0 010 1.072l-4.995 4.995a.763.763 0 01-1.071 0l-2.144-2.143a.763.763 0 010-1.072.763.763 0 011.072 0l1.618 1.618z"
                fill="currentColor"
            />
        </g>
        <defs>
            <filter
                id="ic_24_alarm_svg__filter0_b"
                x={-72.559}
                y={-72.559}
                width={168.402}
                height={169.119}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImage" stdDeviation={37.28} />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
                <feBlend in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
            </filter>
        </defs>
    </svg>
);
