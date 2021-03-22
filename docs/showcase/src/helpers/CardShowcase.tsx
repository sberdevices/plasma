import React from 'react';
import styled from 'styled-components';
import { Headline4 } from '@sberdevices/ui/components/Typography';

import { ShowcaseHead } from './Showcase';

const StyledGrid = styled.div<{ $cols: number; $width?: string }>`
    display: grid;
    grid-template-columns: repeat(${({ $cols, $width }) => `${$cols}, ${$width || '22.5rem'}`});
    grid-gap: 0.625rem 1.25rem;
    justify-content: flex-start;
`;
const StyledRow = styled.div`
    display: contents;
`;
const StyledCell = styled.div`
    align-self: start;
`;
const StyledHeadline4 = styled(Headline4)`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`;

type Col = Record<string, React.ReactNode>;
type Section = Record<string, Col>;

/**
 * Шоукейсы - обертки для демонстрации / тестирования полной раскладки презентуемого компонента.
 */
export const Showcase = ({ sections, ...rest }: { sections: Section; colWidth?: string }) => (
    <>
        {Object.entries(sections).map(([section, row], i) => (
            <React.Fragment key={i}>
                <StyledHeadline4>{section}</StyledHeadline4>
                <ShowcaseGrid cols={row} {...rest} />
            </React.Fragment>
        ))}
    </>
);

const ShowcaseGrid = ({ cols, colWidth }: { cols: Col; colWidth?: string }) => {
    const rows = Object.entries(cols);

    return (
        <StyledGrid $cols={rows.length} $width={colWidth}>
            <StyledRow>
                {rows.map(([col]) => (
                    <ShowcaseHead>{col}</ShowcaseHead>
                ))}
            </StyledRow>
            {rows.map(([, node]) => (
                <StyledCell>{node}</StyledCell>
            ))}
        </StyledGrid>
    );
};
