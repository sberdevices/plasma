import React from 'react';
import styled from 'styled-components';
import { footnote1 } from '@sberdevices/plasma-tokens';

/**
 * Компонент для создания маркированных списков.
 */
export const MarkedList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

const StyledMarkedItem = styled.li`
    ${footnote1};
    display: flex;
    align-items: center;
    margin-top: 0.75rem;
`;

const StyledItemText = styled.span`
    /* stylelint-disable-next-line selector-max-universal, selector-nested-pattern */
    * + & {
        margin-left: 0.75rem;
    }
`;

export interface MarkedItemProps {
    /**
     * Текстовое значение, оборачивается в свой тег
     */
    text?: string;
}

export const MarkedItem: React.FC<MarkedItemProps & React.LiHTMLAttributes<HTMLLIElement>> = ({
    text,
    children,
    ...props
}) => (
    <StyledMarkedItem {...props}>
        {children}
        {text && <StyledItemText>{text}</StyledItemText>}
    </StyledMarkedItem>
);
