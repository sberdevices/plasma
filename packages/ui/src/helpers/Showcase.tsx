import styled, { css } from 'styled-components';

export const ShowcaseComponentGrid = styled.div<{ cols?: number }>`
    display: grid;
    grid-template-columns: ${({ cols = 2 }) => css`
        repeat(${cols}, max-content)
    `};
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;
`;

export const ShowcaseComponentRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const ShowcaseDashedBorder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.25rem;
    /* stylelint-disable-next-line number-max-precision */
    border: 0.0625rem dashed #7765f6;
    border-radius: 1.25rem;
`;
