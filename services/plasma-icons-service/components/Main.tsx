import { FC } from 'react';
import styled from 'styled-components';
import { Container } from '@sberdevices/plasma-web';

const StyledMain = styled.main`
    padding: 3.75rem 0;
`;

export const Main: FC = ({ children }) => (
    <StyledMain>
        <Container>{children}</Container>
    </StyledMain>
);
