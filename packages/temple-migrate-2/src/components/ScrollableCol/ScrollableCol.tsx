import { Col, ColProps } from '@sberdevices/plasma-ui';
import React from 'react';
import styled from 'styled-components';

import { useElementScroll } from './hooks/useElementScroll';

const StyledContainer = styled(Col)`
    overflow-y: scroll;
    height: calc(100vh - 5rem);
    outline: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const StyledPlaceholder = styled.div`
    padding-bottom: 4.5rem;
`;

export const ScrollableCol: React.FC<ColProps> = ({ children, ...props }) => {
    const scrollableRef = useElementScroll();

    return (
        <StyledContainer {...props} ref={scrollableRef} tabIndex={-1}>
            {children}
            <StyledPlaceholder />
        </StyledContainer>
    );
};
