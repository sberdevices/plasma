import React from 'react';

import { IconProps } from '../IconRoot';

export const StoreRemote: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.026 20.324c.231.318.56.646 1.217 1.303.657.657.985.986 1.303 1.217a5 5 0 005.878 0c.319-.231.647-.56 1.304-1.217l9.9-9.9c.656-.656.985-.984 1.216-1.303a5 5 0 000-5.878c-.231-.318-.56-.646-1.217-1.303-.656-.657-.985-.986-1.303-1.217a5 5 0 00-5.878 0c-.319.231-.647.56-1.304 1.217l-9.9 9.9c-.656.656-.985.984-1.216 1.303a5 5 0 000 5.878zm9.804-7.28a3.998 3.998 0 005.655-.002 3.998 3.998 0 00.002-5.656 4.002 4.002 0 00-5.66 0 4.002 4.002 0 00.003 5.657zm5.655-8.488a1 1 0 11-1.414-1.413 1 1 0 011.414 1.413zm2.83 4.243a1 1 0 101.413-1.414A1 1 0 0020.314 8.8zM9 13.042a1 1 0 11-1.414-1.414A1 1 0 019 13.042zm2.829 4.243a1 1 0 101.413-1.414 1 1 0 00-1.413 1.414z"
            fill="url(#mc_24_store_remote_svg__paint0_linear)"
        />
        <circle
            cx={14.657}
            cy={10.213}
            r={2}
            transform="rotate(-45 14.657 10.213)"
            fill="url(#mc_24_store_remote_svg__paint1_linear)"
        />
        <defs>
            <linearGradient
                id="mc_24_store_remote_svg__paint0_linear"
                x1={0.399}
                y1={5.572}
                x2={25.412}
                y2={22.083}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="currentColor" />
                <stop offset={1} stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
            <linearGradient
                id="mc_24_store_remote_svg__paint1_linear"
                x1={13.857}
                y1={5.759}
                x2={17.433}
                y2={14.492}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="currentColor" />
                <stop offset={1} stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
        </defs>
    </svg>
);
