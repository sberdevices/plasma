import React from 'react';
import styled from 'styled-components';

const StyledRoot = styled.div`
    color: #fff;
    font-weight: 500;
    line-height: 40px;
    font-size: 32px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    white-space: normal;
`;

export const CardLabel: React.FC = ({ children }) => {
    return <StyledRoot>{children}</StyledRoot>;
};

export default CardLabel;
