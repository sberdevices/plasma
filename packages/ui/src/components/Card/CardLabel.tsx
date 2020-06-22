import React from 'react';
import styled from 'styled-components';

const StyledRoot = styled.div`
    height: 80px;
    line-height: 40px;
    font-size: 32px;
    font-weight: 500;
    color: #fff;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`;

export const CardLabel: React.FC = ({ children }) => {
    return <StyledRoot>{children}</StyledRoot>;
};

export default CardLabel;
