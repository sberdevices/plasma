import React from 'react';

import { IconProps } from '../IconRoot';

export const MusicAlbum: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            opacity={0.5}
            d="M3 7c0-.93 0-1.394.077-1.78A4 4 0 016.22 2.077C6.606 2 7.07 2 8 2h8c.93 0 1.394 0 1.78.077a4 4 0 013.143 3.143C21 5.606 21 6.07 21 7H3z"
            fill="currentColor"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.545 5.73C2 6.8 2 8.2 2 11v3c0 2.8 0 4.2.545 5.27a5 5 0 002.185 2.185C5.8 22 7.2 22 10 22h4c2.8 0 4.2 0 5.27-.545a5 5 0 002.185-2.185C22 18.2 22 16.8 22 14v-3c0-2.8 0-4.2-.545-5.27a5 5 0 00-2.185-2.185C18.2 3 16.8 3 14 3h-4c-2.8 0-4.2 0-5.27.545A5 5 0 002.545 5.73zm7.168 3.448c0-.278.12-.466.418-.527.497-.105 6.305-1.486 6.305-1.486S17 7.04 17 7.73v6.922c0 .777-.045 2.317-2.152 2.317-2.272 0-2.421-1.048-2.421-1.738 0-1.025.713-1.447 2.439-1.447 1.21 0 1.524-.52 1.524-1.16v-2.143c0-.185-.179-.323-.37-.283-.876.182-1.865.455-2.834.721-.933.257-1.847.509-2.625.67a.292.292 0 00-.238.283V16.1c0 .777-.045 2.317-2.152 2.317-2.271 0-2.421-1.048-2.421-1.737 0-1.026.713-1.448 2.44-1.448 1.21 0 1.523-.519 1.523-1.16V9.179z"
            fill="currentColor"
        />
    </svg>
);
