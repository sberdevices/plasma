import React from 'react';
import styled from 'styled-components';

const StyledCardBody = styled.div`
    position: relative;

    display: flex;
    overflow: hidden;
    flex: 1;
    flex-direction: column;

    box-sizing: content-box;
    width: 100%;

    border-radius: inherit;
`;

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Помещается в ``<Card />`` и скругляет рамки содержимого внутри него.
 * Обязательно к использованию для корректного отображения скругленных углов контента.
 */
export const CardBody: React.FC<CardBodyProps> = ({ children, className, ...rest }) => {
    return (
        <StyledCardBody className={className} {...rest}>
            {children}
        </StyledCardBody>
    );
};
