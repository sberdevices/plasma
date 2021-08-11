import React from 'react';
import styled from 'styled-components';
import { Headline4 } from '@sberdevices/plasma-ui/components/Typography';

import { ShowcaseHead } from './Showcase';

const StyledGrid = styled.div<{ $cols: number; $width?: string }>`
    display: grid;
    grid-template-columns: repeat(${({ $cols, $width }) => `${$cols}, ${$width || 'max-content'}`});
    grid-gap: 2.5rem 5rem;

    /* stylelint-disable-next-line selector-max-universal */
    & > * {
        align-self: center;
    }
`;
const StyledRow = styled.div`
    display: contents;
`;
const StyledHeadline4 = styled(Headline4)`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`;

/**
 * Шоукейсы - обертки для демонстрации / тестирования полной раскладки презентуемого компонента.
 */
export const Showcase = ({
    sizes,
    ...rest
}: {
    sizes?: Record<string, string>;
    rows: Record<string, object>;
    cols: Record<string, object>;
    component: any;
    colWidth?: string;
}) => (
    <>
        {sizes ? (
            Object.entries(sizes).map(([size, title]) => (
                <React.Fragment key={size}>
                    <StyledHeadline4>{title}</StyledHeadline4>
                    <ShowcaseGrid {...rest} size={size} />
                </React.Fragment>
            ))
        ) : (
            <ShowcaseGrid {...rest} />
        )}
    </>
);

const ShowcaseGrid = ({
    size,
    rows,
    cols,
    component: Component,
    colWidth,
}: {
    size?: string;
    rows: Record<string, object>;
    cols: Record<string, object>;
    component: any;
    colWidth?: string;
}) => {
    const colsList = Object.entries(cols);

    return (
        <StyledGrid $cols={colsList.length} $width={colWidth}>
            <StyledRow>
                {colsList.map(([head], i) => (
                    <ShowcaseHead key={`head:${i}`}>{head}</ShowcaseHead>
                ))}
            </StyledRow>
            {Object.entries(rows).map(([, row], i) =>
                colsList.map(([, col], j) => <Component key={`${i}${j}`} size={size} {...row} {...col} />),
            )}
        </StyledGrid>
    );
};
