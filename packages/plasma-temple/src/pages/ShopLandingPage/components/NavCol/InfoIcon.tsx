import React from 'react';

export const InfoIcon: React.FC<{ className?: string }> = (props) => (
    <svg viewBox="0 0 76 82" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="54.5" cy="41.5" r="54.5" fill="url(#paint0_linear)" fillOpacity=".12" />
        <circle cx="61.5" cy="41.5" r="45.5" fill="url(#paint1_linear)" fillOpacity=".12" />
        <g opacity=".56" filter="url(#filter0_d)">
            <rect
                x="52"
                y="32"
                width="14"
                height="14"
                rx="5"
                transform="rotate(-180 52 32)"
                fill="url(#paint2_linear)"
            />
            <rect
                x="52"
                y="64"
                width="14"
                height="27"
                rx="5"
                transform="rotate(-180 52 64)"
                fill="url(#paint3_linear)"
            />
        </g>
        <defs>
            <linearGradient id="paint0_linear" x1="54.5" y1="-13" x2="54.5" y2="96" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fff" />
                <stop offset=".884" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="61.5" y1="-4" x2="61.5" y2="104" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fff" />
                <stop offset=".775" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint2_linear" x1="52" y1="28.5" x2="64.337" y2="50.047" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient
                id="paint3_linear"
                x1="39.896"
                y1="53.128"
                x2="61.977"
                y2="94.049"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity=".19" />
            </linearGradient>
            <filter
                id="filter0_d"
                x="14"
                y="-8"
                width="74"
                height="106"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="6" dy="4" />
                <feGaussianBlur stdDeviation="15" />
                <feColorMatrix values="0 0 0 0 0.1715 0 0 0 0 0 0 0 0 0 0.175 0 0 0 0.4 0" />
                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
        </defs>
    </svg>
);
