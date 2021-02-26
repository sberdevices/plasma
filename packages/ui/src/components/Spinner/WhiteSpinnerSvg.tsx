import React from 'react';

interface SpinnerSvgProps {
    width: number;
    height: number;
}

export const WhiteSpinnerSvg: React.FC<SpinnerSvgProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.84615 12C1.84615 6.39219 6.39219 1.84615 12 1.84615C17.6078 1.84615 22.1538 6.39219 22.1538 12C22.1538 17.6078 17.6078 22.1538 12 22.1538C11.4902 22.1538 11.0769 22.5671 11.0769 23.0769C11.0769 23.5867 11.4902 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 8.1423e-07 12 5.24537e-07C5.37258 2.34843e-07 -2.34843e-07 5.37258 -5.24537e-07 12C-5.8817e-07 13.4558 0.259638 14.853 0.735932 16.1464C1.2771 17.6161 2.09717 18.9498 3.13125 20.0838C4.87183 21.9923 7.22237 23.3385 9.87695 23.8126C10.3788 23.9023 10.8583 23.5681 10.948 23.0662C11.0376 22.5644 10.7034 22.0849 10.2016 21.9952C7.95937 21.5947 5.97048 20.4573 4.49534 18.8397C3.61926 17.8791 2.92566 16.7504 2.46837 15.5085C2.06618 14.4163 1.84615 13.2349 1.84615 12Z"
            fill="url(#paint0_linear)"
        />
        <defs>
            <linearGradient
                id="paint0_linear"
                x1="2.64606"
                y1="6.94881"
                x2="8.514"
                y2="22.0432"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);
