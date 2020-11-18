import React from 'react';

import { IconAsset } from '../IconRoot';

export const Play: React.FC<IconAsset> = (props) => (
    <svg width="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g filter="url(#ic_24_play_svg__filter0_b)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.037 10.738a1.5 1.5 0 010 2.524l-9.726 6.252C8.313 20.156 7 19.44 7 18.253V5.748C7 4.56 8.313 3.844 9.311 4.486l9.726 6.252z"
                fill="currentColor"
            />
        </g>
        <defs>
            <filter
                id="ic_24_play_svg__filter0_b"
                x={-101.731}
                y={-104.486}
                width={230.189}
                height={232.972}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImage" stdDeviation={54.366} />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
                <feBlend in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
            </filter>
        </defs>
    </svg>
);
