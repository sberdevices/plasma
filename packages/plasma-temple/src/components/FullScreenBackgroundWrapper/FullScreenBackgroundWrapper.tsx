import React from 'react';
import styled from 'styled-components';

const StyledBackgroundWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;

    width: 78%;

    user-select: none;
    pointer-events: none;

    mask-image: linear-gradient(
        270.17deg,
        #ffffff 50.05%,
        rgba(255, 255, 255, 0.991353) 53.37%,
        rgba(255, 255, 255, 0.96449) 56.69%,
        rgba(255, 255, 255, 0.91834) 60.01%,
        rgba(255, 255, 255, 0.852589) 63.33%,
        rgba(255, 255, 255, 0.768225) 66.65%,
        rgba(255, 255, 255, 0.668116) 69.97%,
        rgba(255, 255, 255, 0.557309) 73.29%,
        rgba(255, 255, 255, 0.442691) 76.61%,
        rgba(255, 255, 255, 0.331884) 79.93%,
        rgba(255, 255, 255, 0.231775) 83.24%,
        rgba(255, 255, 255, 0.147411) 86.56%,
        rgba(255, 255, 255, 0.0816599) 89.88%,
        rgba(255, 255, 255, 0.03551) 93.2%,
        rgba(255, 255, 255, 0.0086472) 96.52%,
        rgba(255, 255, 255, 0) 99.84%
    ); ;
`;

const StyledBackgroundWrapperInner = styled(StyledBackgroundWrapper)`
    width: 100%;
    mask-image: linear-gradient(
        180deg,
        #ffffff 38.31%,
        rgba(255, 255, 255, 0.991353) 42.42%,
        rgba(255, 255, 255, 0.96449) 46.52%,
        rgba(255, 255, 255, 0.91834) 50.63%,
        rgba(255, 255, 255, 0.852589) 54.73%,
        rgba(255, 255, 255, 0.768225) 58.84%,
        rgba(255, 255, 255, 0.668116) 62.94%,
        rgba(255, 255, 255, 0.557309) 67.05%,
        rgba(255, 255, 255, 0.442691) 71.16%,
        rgba(255, 255, 255, 0.331884) 75.26%,
        rgba(255, 255, 255, 0.231775) 79.37%,
        rgba(255, 255, 255, 0.147411) 83.47%,
        rgba(255, 255, 255, 0.0816599) 87.58%,
        rgba(255, 255, 255, 0.03551) 91.68%,
        rgba(255, 255, 255, 0.0086472) 95.79%,
        rgba(255, 255, 255, 0) 99.89%
    ); ;
`;

export const FullScreenBackgroundWrapper: React.FC = ({ children }) => {
    return (
        <StyledBackgroundWrapper>
            <StyledBackgroundWrapperInner>{children}</StyledBackgroundWrapperInner>
        </StyledBackgroundWrapper>
    );
};
