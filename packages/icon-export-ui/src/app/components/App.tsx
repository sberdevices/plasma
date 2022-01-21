import React from 'react';
import styled from 'styled-components';

import { Footer, Form, Header } from '.';

const StyledRoot = styled.div`
    padding: 6px 12px;
`;

/**
 * UI окно плагина.
 */
const App = () => {
    return (
        <StyledRoot>
            <Header />
            <Form />
            <Footer />
        </StyledRoot>
    );
};

export default App;
