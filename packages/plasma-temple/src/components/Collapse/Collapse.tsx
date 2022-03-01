import React from 'react';
import styled from 'styled-components';
import { IconChevronUp, IconChevronDown } from '@sberdevices/plasma-icons';
import { Headline3 } from '@sberdevices/plasma-ui';

import { useCollapse } from './hooks/useCollapse';

interface CollapseProps {
    title: React.ReactNode;
}

const StyledTitle = styled(Headline3)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
`;

const StyledContainer = styled.div<{ $height: number | string }>`
    height: ${({ $height }) => (typeof $height === 'string' ? $height : `${$height}px`)};
    transition: height 0.3s linear;
    overflow: hidden;
`;

export const Collapse: React.FC<React.PropsWithChildren<CollapseProps>> = ({ title, children }) => {
    const { collapseRef, height, expanded, toggle } = useCollapse();

    return (
        <>
            <StyledTitle onClick={toggle} data-cy="Collapse-title">
                {title}
                {expanded ? <IconChevronUp /> : <IconChevronDown />}
            </StyledTitle>
            <StyledContainer $height={height} ref={collapseRef}>
                {children}
            </StyledContainer>
        </>
    );
};
