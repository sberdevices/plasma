import React from 'react';

import { IconProps } from '../IconRoot';

export const Gyro: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm9.794-9.97a10.012 10.012 0 01-7.788 7.769c.035-.772.28-3.586 1.994-5.299 1.728-1.728 4.95-2.337 5.794-2.47zM12 2c4.379 0 8.1 2.814 9.454 6.733C20.237 8.188 17.01 7 12 7 6.99 7 3.763 8.188 2.546 8.733 3.9 4.814 7.62 2 12 2zM9.994 21.799a10.012 10.012 0 01-7.788-7.769c.843.133 4.066.742 5.794 2.47 1.713 1.713 1.959 4.527 1.994 5.299zM12 15a3 3 0 100-6 3 3 0 000 6z"
            fill="currentColor"
        />
    </svg>
);
