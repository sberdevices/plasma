import React from 'react';

import { IconProps } from '../IconRoot';

export const Cart: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.2 5c.442 0 .8.362.8.81v15.38c0 .448-.358.81-.8.81H4.8a.805.805 0 01-.8-.81V5.81c0-.448.358-.81.8-.81h14.4zM7.714 3.5h8.572c.394 0 .714-.336.714-.75S16.68 2 16.286 2H7.714C7.32 2 7 2.336 7 2.75s.32.75.714.75zm7.62 5.3c0 1.767-1.493 3.2-3.334 3.2s-3.333-1.433-3.333-3.2c0-.442-.373-.8-.834-.8-.46 0-.833.358-.833.8 0 2.65 2.238 4.8 5 4.8s5-2.15 5-4.8c0-.442-.373-.8-.833-.8-.46 0-.834.358-.834.8z"
            fill="currentColor"
        />
    </svg>
);
