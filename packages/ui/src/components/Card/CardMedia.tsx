import React from 'react';
import styled from 'styled-components';

export interface CardMediaProps {
    src: string;
    disabled?: boolean;
    className?: string;
}

const StyledRoot = styled.div`
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    display: block;
    position: relative;
    height: 392px;
    width: 100%;
`;

export const CardMedia: React.FC<CardMediaProps> = ({ children, className, disabled, src }) => {
    return (
        <StyledRoot
            className={className}
            style={{
                backgroundImage: `url('${src}')`,
                opacity: disabled ? 0.5 : 1,
            }}
        >
            {children}
        </StyledRoot>
    );
};
