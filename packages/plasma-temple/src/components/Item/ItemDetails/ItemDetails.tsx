import { mediaQuery, TextBox, TextBoxLabel, TextBoxTitle } from '@sberdevices/plasma-ui';
import React from 'react';
import styled, { css } from 'styled-components';

export interface ItemDetailsItem {
    /** Заголовок */
    title: React.ReactNode;
    /** Контент */
    content: React.ReactNode;
}

export interface ItemDetailsProps {
    /** Детали */
    details: ItemDetailsItem[];
    className?: string;
}

const StyledContainer = styled.div`
    display: grid;
    grid-gap: 1rem;
    justify-content: start;
    grid-template-columns: repeat(auto-fill, minmax(10rem, auto));

    ${mediaQuery(
        'S',
        1,
    )(css`
        grid-template-columns: repeat(auto-fit, 100%);
    `)}
`;

const StyledTextBoxLabel = styled(TextBoxLabel)`
    margin-bottom: 0.25rem;
`;

/** Компонент, используемый для отображения деталей (характеристик) */
export const ItemDetails: React.FC<ItemDetailsProps> = ({ className, details }) => {
    return (
        <StyledContainer className={className}>
            {details.map(
                ({ title, content }, index) =>
                    content && (
                        <TextBox key={index}>
                            <StyledTextBoxLabel>{title}</StyledTextBoxLabel>
                            <TextBoxTitle>{content}</TextBoxTitle>
                        </TextBox>
                    ),
            )}
        </StyledContainer>
    );
};
