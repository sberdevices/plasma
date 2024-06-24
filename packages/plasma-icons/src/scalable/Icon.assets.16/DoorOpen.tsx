import React from 'react';

import { IconProps } from '../IconRoot';

export const DoorOpen: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 1C3.75029 1 3.52195 1.09153 3.34671 1.24287C3.31037 1.27422 3.27653 1.30799 3.24534 1.34386C3.09253 1.51947 3 1.74893 3 2V13C3 13.3788 3.214 13.725 3.55279 13.8944L7.55279 15.8944C7.86277 16.0494 8.23091 16.0329 8.52573 15.8507C8.82055 15.6684 9 15.3466 9 15V4C9 3.62123 8.786 3.27497 8.44721 3.10557L8.23607 3H11V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V2C13 1.44772 12.5523 1 12 1H4.00012H4ZM5 3.61804V12.382L7 13.382V10C6.44772 10 6 9.55229 6 9C6 8.44772 6.44772 8 7 8V4.61804L5 3.61804Z"
            fill="currentColor"
        />
    </svg>
);
