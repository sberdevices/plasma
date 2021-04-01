import styled from 'styled-components';

/**
 * Блок с полями по бокам для размещения контента по вертикали.
 * Блок нельзя вкладывать сам в себя или дальше по дереву.
 */
export const Container = styled.div`
    margin: 0 auto;

    display: flex;
    box-sizing: border-box;
    flex-direction: column;

    width: 100%;
    padding-left: var(--plasma-grid-margin);
    padding-right: var(--plasma-grid-margin);
`;
