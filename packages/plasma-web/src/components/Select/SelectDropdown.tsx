import React from 'react';
import styled from 'styled-components';

const StyledDropdown = styled.div`
    position: absolute;
    top: 3rem;
    left: 0;
    z-index: 1;

    padding-top: 0.25rem;
    width: 100%;

    & & {
        top: 0;
        left: 100%;

        margin-top: -0.25rem;
        padding-top: 0;
        padding-left: 0.625rem;

        width: auto;
        max-width: 100%;
    }
`;

export const SelectDropdown: React.FC<{ open?: boolean }> = ({ open, children }) => {
    return <StyledDropdown style={{ display: open ? 'block' : 'none' }}>{children}</StyledDropdown>;
};
