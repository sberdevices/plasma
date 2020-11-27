import styled from 'styled-components';

export const Row = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;

    margin-left: calc(var(--plasma-grid-gutter) * -1);
    margin-right: calc(var(--plasma-grid-gutter) * -1);
`;
