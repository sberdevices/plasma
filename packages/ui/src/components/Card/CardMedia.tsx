import React from 'react';
import styled from 'styled-components';

export interface CardMediaProps {
    src: string;
    disabled?: boolean;
    className?: string;
}

const StyledRoot = styled.div`
    position: relative;

    display: block;

    width: 100%;
    height: 392px;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
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
