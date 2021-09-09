import React from 'react';
import styled from 'styled-components';
import { overlay } from '@sberdevices/plasma-tokens';
import { Spinner } from '@sberdevices/plasma-ui';

const StyledContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${overlay};

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const PageSpinner: React.FC = () => {
    return (
        <StyledContainer>
            <Spinner />
        </StyledContainer>
    );
};
