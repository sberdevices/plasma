import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-ui';

interface MaskProps {
    $mask?: boolean;
}

const StyledBackgroundWrapper = styled.div<MaskProps>`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;

    width: ${({ $mask }) => ($mask ? 78 : 100)}%;

    user-select: none;
    pointer-events: none;

    ${({ $mask }) =>
        $mask &&
        css`
            /* stylelint-disable */
            mask-image: linear-gradient(
                270.17deg,
                #fff 50.05%,
                rgba(255, 255, 255, 0.991) 53.37%,
                rgba(255, 255, 255, 0.965) 56.69%,
                rgba(255, 255, 255, 0.918) 60.01%,
                rgba(255, 255, 255, 0.853) 63.33%,
                rgba(255, 255, 255, 0.768) 66.65%,
                rgba(255, 255, 255, 0.668) 69.97%,
                rgba(255, 255, 255, 0.557) 73.29%,
                rgba(255, 255, 255, 0.443) 76.61%,
                rgba(255, 255, 255, 0.332) 79.93%,
                rgba(255, 255, 255, 0.232) 83.24%,
                rgba(255, 255, 255, 0.147) 86.56%,
                rgba(255, 255, 255, 0.082) 89.88%,
                rgba(255, 255, 255, 0.036) 93.2%,
                rgba(255, 255, 255, 0.009) 96.52%,
                rgba(255, 255, 255, 0) 99.84%
            );

            ${mediaQuery(
                'S',
                1,
            )(css`
                mask-image: linear-gradient(
                    180deg,
                    #fff 50.05%,
                    rgba(255, 255, 255, 0.991) 53.37%,
                    rgba(255, 255, 255, 0.965) 56.69%,
                    rgba(255, 255, 255, 0.918) 60.01%,
                    rgba(255, 255, 255, 0.853) 63.33%,
                    rgba(255, 255, 255, 0.768) 66.65%,
                    rgba(255, 255, 255, 0.668) 69.97%,
                    rgba(255, 255, 255, 0.557) 73.29%,
                    rgba(255, 255, 255, 0.443) 76.61%,
                    rgba(255, 255, 255, 0.332) 79.93%,
                    rgba(255, 255, 255, 0.232) 83.24%,
                    rgba(255, 255, 255, 0.147) 86.56%,
                    rgba(255, 255, 255, 0.082) 89.88%,
                    rgba(255, 255, 255, 0.036) 93.2%,
                    rgba(255, 255, 255, 0.009) 96.52%,
                    rgba(255, 255, 255, 0) 99.84%
                );
                /* stylelint-enable */
            `)}
        `}

    ${mediaQuery(
        'S',
        1,
    )(css`
        left: 0;

        width: 100%;
        height: 100%;
    `)}

    z-index: -1;
`;

const StyledBackgroundWrapperInner = styled(StyledBackgroundWrapper)<MaskProps>`
    width: 100%;

    ${({ $mask }) =>
        $mask &&
        css`
            /* stylelint-disable */
            mask-image: linear-gradient(
                180deg,
                #fff 38.31%,
                rgba(255, 255, 255, 0.991) 42.42%,
                rgba(255, 255, 255, 0.965) 46.52%,
                rgba(255, 255, 255, 0.918) 50.63%,
                rgba(255, 255, 255, 0.853) 54.73%,
                rgba(255, 255, 255, 0.768) 58.84%,
                rgba(255, 255, 255, 0.668) 62.94%,
                rgba(255, 255, 255, 0.557) 67.05%,
                rgba(255, 255, 255, 0.443) 71.16%,
                rgba(255, 255, 255, 0.332) 75.26%,
                rgba(255, 255, 255, 0.232) 79.37%,
                rgba(255, 255, 255, 0.147) 83.47%,
                rgba(255, 255, 255, 0.082) 87.58%,
                rgba(255, 255, 255, 0.036) 91.68%,
                rgba(255, 255, 255, 0.009) 95.79%,
                rgba(255, 255, 255, 0) 99.89%
            );
            /* stylelint-enable */
        `}
`;

export const FullScreenBackgroundWrapper: React.FC<React.PropsWithChildren<{ className?: string; mask?: boolean }>> = ({
    className,
    mask = true,
    children,
}) => {
    return (
        <StyledBackgroundWrapper className={className} $mask={mask}>
            <StyledBackgroundWrapperInner $mask={mask}>{children}</StyledBackgroundWrapperInner>
        </StyledBackgroundWrapper>
    );
};
