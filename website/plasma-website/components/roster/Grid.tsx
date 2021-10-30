import styled from 'styled-components';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(8, calc(12.5% - 0.5rem + 0.5rem / 8));
    gap: var(--plasma-grid-gutter);
`;
