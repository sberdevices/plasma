import React from 'react';
import styled, { css } from 'styled-components';

import { ShowcaseHead } from './Showcase';

const StyledGrid = styled.div<{ $heads?: boolean; $templateColumns?: string }>`
    display: grid;
    ${({ $heads, $templateColumns }) =>
        ($heads || $templateColumns) &&
        css`
            grid-template-columns: ${$heads && 'max-content'} ${$templateColumns};
        `};
    grid-gap: 2rem;
`;
const StyledCell = styled.div`
    display: grid;
    grid-row-gap: 1rem;
`;

export const ShowcaseGridTable = ({
    cols,
    rows,
    data,
    templateColumns,
    ...rest
}: {
    cols?: React.ReactNode[];
    rows?: React.ReactNode[];
    data: React.ReactNode[][];
    templateColumns?: string;
}) => (
    <StyledGrid {...rest} $heads={!!rows} $templateColumns={templateColumns}>
        {cols && ['', ...cols].map((col, i) => <ShowcaseHead key={i}>{col}</ShowcaseHead>)}
        {data.map((items, i) => (
            <React.Fragment key={i}>
                {rows && <ShowcaseHead>{rows[i]}</ShowcaseHead>}
                {items.map((item, j) => (
                    <StyledCell key={`${i}${j}`}>{item}</StyledCell>
                ))}
            </React.Fragment>
        ))}
    </StyledGrid>
);
