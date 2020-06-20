import React from 'react';
import styled, { css } from 'styled-components';

import ScrollerContext from './ScrollerContext';

interface ScrollerItemProps {
    gap: number;
}

const StyledRoot = styled.div<{ gap: number }>`
    position: relative;

    display: inline-block;

    ${({ gap }) => css`
        margin-left: ${gap}px;
    `}

    &:first-child {
        margin-left: 0;
    }
`;

const ScrollerItem: React.FC<ScrollerItemProps> = ({ gap, children }) => {
    const ref = React.useRef<HTMLInputElement>();

    const ctx = React.useContext(ScrollerContext);

    React.useEffect(() => {
        ctx.register(ref);

        return () => ctx.unregister(ref);
    }, [ref, ctx]);

    return (
        <StyledRoot ref={ref as React.MutableRefObject<HTMLInputElement>} gap={gap}>
            {children}
        </StyledRoot>
    );
};

export default ScrollerItem;
