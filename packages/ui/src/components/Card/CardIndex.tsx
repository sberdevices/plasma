import React from 'react';
import styled from 'styled-components';

interface CardIndexProps {
    index: number;
    color?: string;
    className?: string;
}

const StyledRoot = styled.div<{ color: string }>`
    height: 64px;
    width: 64px;
    text-align: center;
    line-height: 64px;
    font-size: 28px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.55);

    background-color: ${({ color }) => color};
    border-radius: 40px;
`;

export const CardIndex: React.FC<CardIndexProps> = ({ index, className, color = '#eaeaec' }) => {
    return (
        <StyledRoot color={color} className={className}>
            {index}
        </StyledRoot>
    );
};

export default CardIndex;
