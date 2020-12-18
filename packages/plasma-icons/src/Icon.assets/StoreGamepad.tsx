import React from 'react';

import { IconProps } from '../IconRoot';

export const StoreGamepad: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.076 6.06H6.805A2.958 2.958 0 003.49 7.817L.24 15.472a3.025 3.025 0 00.676 3.352l.462.447.061.057a2.59 2.59 0 003.689-.203l2.714-3.065h8.337l2.716 3.065a2.59 2.59 0 003.688.203l.062-.057.439-.425a3.025 3.025 0 00.659-3.391L20.358 7.78a2.958 2.958 0 00-3.282-1.72zM7.908 8a.988.988 0 00-.989.988V10h-.977a1 1 0 100 2h.977v1.011a.989.989 0 001.977 0V12h.977a1 1 0 000-2h-.977V8.988A.988.988 0 007.908 8zm8.896 1c0 .552-.442 1-.988 1a.994.994 0 01-.989-1c0-.552.443-1 .989-1s.988.448.988 1zm0 4c0 .552-.442 1-.988 1a.994.994 0 01-.989-1c0-.552.443-1 .989-1s.988.448.988 1zm-2.965-1a.994.994 0 00.988-1c0-.552-.442-1-.988-1a.994.994 0 00-.989 1c0 .552.443 1 .989 1zm4.942-1c0 .552-.442 1-.988 1a.994.994 0 01-.989-1c0-.552.443-1 .989-1s.988.448.988 1z"
            fill="url(#mc_24_store_gamepad_svg__paint0_linear)"
        />
        <defs>
            <linearGradient
                id="mc_24_store_gamepad_svg__paint0_linear"
                x1={7.355}
                y1={0.175}
                x2={15.744}
                y2={33.779}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="currentColor" />
                <stop offset={1} stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
        </defs>
    </svg>
);
