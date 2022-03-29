import React from 'react';

import { IconProps } from '../IconRoot';

export const RemoteFill: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.15 3.87035L20.07 6.38035C20.3224 6.54121 20.5354 6.75666 20.6935 7.01081C20.8515 7.26497 20.9505 7.55135 20.9831 7.84885C21.0157 8.14634 20.9812 8.44737 20.882 8.72974C20.7828 9.0121 20.6215 9.26861 20.41 9.48035L10.1 19.7803C9.9139 19.9693 9.69208 20.1194 9.44744 20.2218C9.20279 20.3243 8.94022 20.377 8.675 20.377C8.40978 20.377 8.14721 20.3243 7.90257 20.2218C7.65792 20.1194 7.4361 19.9693 7.25 19.7803L4.06 16.4903C3.69053 16.116 3.48337 15.6113 3.48337 15.0853C3.48337 14.5594 3.69053 14.0546 4.06 13.6803L13.66 4.14035C13.9823 3.81857 14.4047 3.61642 14.8575 3.56732C15.3103 3.51823 15.7662 3.62513 16.15 3.87035ZM8.3944 12.9558C8.62179 12.9358 8.83549 12.8386 9 12.6803C9.08087 12.609 9.14564 12.5213 9.19 12.423C9.23436 12.3248 9.25731 12.2182 9.25731 12.1103C9.25731 12.0025 9.23436 11.8959 9.19 11.7977C9.14564 11.6994 9.08087 11.6117 9 11.5403C8.81038 11.4133 8.58299 11.3549 8.3556 11.3749C8.12821 11.3949 7.91451 11.4921 7.75 11.6503C7.66913 11.7217 7.60436 11.8094 7.56 11.9077C7.51564 12.0059 7.49269 12.1125 7.49269 12.2203C7.49269 12.3282 7.51564 12.4348 7.56 12.533C7.60436 12.6313 7.66913 12.719 7.75 12.7903C7.93962 12.9174 8.16701 12.9758 8.3944 12.9558ZM14.7604 4.97085C14.5308 4.99089 14.3152 5.08963 14.15 5.25035H14.16C14.0791 5.32167 14.0144 5.40938 13.97 5.50765C13.9256 5.60593 13.9027 5.71252 13.9027 5.82035C13.9027 5.92817 13.9256 6.03476 13.97 6.13304C14.0144 6.23132 14.0791 6.31903 14.16 6.39035C14.3496 6.51743 14.577 6.57582 14.8044 6.55581C15.0318 6.5358 15.2455 6.4386 15.41 6.28035C15.4909 6.20903 15.5556 6.12132 15.6 6.02304C15.6444 5.92476 15.6673 5.81817 15.6673 5.71035C15.6673 5.60252 15.6444 5.49593 15.6 5.39766C15.5556 5.29938 15.4909 5.21167 15.41 5.14035C15.2195 5.01068 14.99 4.9508 14.7604 4.97085ZM11.4122 15.5692C11.6689 15.5471 11.9093 15.4341 12.09 15.2503L12.1 15.2403C12.1836 15.1589 12.2494 15.0609 12.293 14.9526C12.3366 14.8444 12.3572 14.7282 12.3535 14.6115C12.3497 14.4949 12.3217 14.3802 12.2711 14.275C12.2206 14.1698 12.1487 14.0762 12.06 14.0003C11.8562 13.8536 11.6073 13.7832 11.3568 13.8015C11.1064 13.8198 10.8703 13.9256 10.69 14.1003C10.5989 14.1792 10.5259 14.2767 10.4758 14.3863C10.4258 14.4958 10.3999 14.6149 10.3999 14.7353C10.3999 14.8558 10.4258 14.9749 10.4758 15.0844C10.5259 15.194 10.5989 15.2915 10.69 15.3703C10.8993 15.5206 11.1554 15.5912 11.4122 15.5692ZM14.4244 12.1583C14.8837 11.8768 15.2587 11.4768 15.51 11.0003C15.6833 10.6997 15.7876 10.3643 15.8152 10.0184C15.8429 9.67246 15.7933 9.32472 15.67 9.00035C15.5524 8.70675 15.3727 8.44209 15.1431 8.22459C14.9135 8.00708 14.6395 7.84188 14.34 7.74035C13.6813 7.54434 12.9753 7.58041 12.3401 7.84252C11.7048 8.10463 11.1788 8.5769 10.85 9.18035C10.6812 9.48266 10.5796 9.81778 10.552 10.1629C10.5244 10.508 10.5714 10.8551 10.69 11.1803C10.8074 11.4768 10.9882 11.7441 11.2196 11.9635C11.4511 12.1828 11.7277 12.349 12.03 12.4503C12.3092 12.5502 12.6035 12.6009 12.9 12.6003C13.4386 12.5925 13.9652 12.4399 14.4244 12.1583ZM17.8975 8.73127C18.1531 8.7092 18.3921 8.59518 18.57 8.41035V8.43035C18.6649 8.35321 18.7416 8.25605 18.7946 8.14582C18.8476 8.03559 18.8756 7.91501 18.8765 7.7927C18.8775 7.6704 18.8514 7.5494 18.8001 7.43835C18.7489 7.3273 18.6737 7.22896 18.58 7.15035C18.3714 6.99803 18.1148 6.92629 17.8575 6.94834C17.6002 6.9704 17.3596 7.08476 17.18 7.27035C17.0892 7.34827 17.0162 7.44491 16.9662 7.55365C16.9163 7.6624 16.8904 7.78066 16.8904 7.90035C16.8904 8.02003 16.9163 8.1383 16.9662 8.24704C17.0162 8.35578 17.0892 8.45243 17.18 8.53035C17.387 8.68195 17.6419 8.75334 17.8975 8.73127ZM13.48 8.81055C13.6367 8.81201 13.7921 8.83903 13.94 8.89055C14.0721 8.93734 14.1929 9.01137 14.2946 9.10784C14.3962 9.20432 14.4764 9.32107 14.53 9.45055C14.586 9.61466 14.606 9.78889 14.5888 9.96142C14.5715 10.134 14.5174 10.3008 14.43 10.4505C14.2391 10.7956 13.9395 11.068 13.5778 11.2253C13.2162 11.3827 12.8127 11.4161 12.43 11.3205C12.2915 11.2763 12.1642 11.2024 12.0571 11.104C11.95 11.0056 11.8657 10.8849 11.81 10.7505C11.7534 10.5865 11.733 10.4122 11.7503 10.2396C11.7676 10.0669 11.8221 9.90009 11.91 9.75055C12.0685 9.47183 12.2964 9.23882 12.5714 9.07412C12.8465 8.90942 13.1595 8.81863 13.48 8.81055Z"
            fill="currentColor"
        />
    </svg>
);
