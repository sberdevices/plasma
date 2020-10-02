import React from 'react';
import styled from 'styled-components';

const StoriesRoot = styled.div`
    overflow: scroll;

    box-sizing: border-box;
    padding: 40px;
`;

const Story: React.FC = ({ children }) => {
    return (
        <>
            <StoriesRoot>{children}</StoriesRoot>
        </>
    );
};

export default Story;
