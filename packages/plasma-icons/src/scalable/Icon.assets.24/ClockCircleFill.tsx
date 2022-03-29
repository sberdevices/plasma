import React from 'react';

import { IconProps } from '../IconRoot';

export const ClockCircleFill: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V12.4226L15.0981 13.634C15.5764 13.9101 15.7403 14.5217 15.4641 15C15.188 15.4783 14.5764 15.6422 14.0981 15.366L11.518 13.8764C11.4774 13.854 11.4384 13.8288 11.4014 13.8012C11.1754 13.632 11.0233 13.3694 11.0024 13.0705C11.0004 13.0419 10.9996 13.0132 11 12.9844V8Z"
            fill="currentColor"
        />
    </svg>
);
