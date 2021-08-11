import React from 'react';
import styled from 'styled-components';

import { actionWithPersistedEvent } from './actionWithPersistedEvent';
import { ShowcaseHead } from './Showcase';

const StyledGrid = styled.div<{ $cols: number }>`
    display: grid;
    grid-template-columns: max-content repeat(${({ $cols }) => $cols}, 20rem);
    grid-gap: 1.25rem;
`;
const StyledRow = styled.div`
    display: contents;
`;

const onChange = actionWithPersistedEvent('onChange');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');
const handlers = { onChange, onFocus, onBlur };

interface TextFieldShowcaseProps {
    props: any;
    rows: Record<string, any>;
    cols: Record<string, any>;
    component: React.ComponentType<any>;
}

/**
 * Шоукейсы - обертки для демонстрации / тестирования полной раскладки презентуемого компонента.
 */
export const TextFieldShowcase = ({ props, rows, cols, component: Component }: TextFieldShowcaseProps) => {
    const colsList = Object.entries(cols);

    return (
        <StyledGrid $cols={colsList.length}>
            <StyledRow>
                <div />
                {colsList.map(([head], i) => (
                    <ShowcaseHead key={`head:${i}`}>{head}</ShowcaseHead>
                ))}
            </StyledRow>
            {Object.entries(rows).map(([head, rowProps], i) => (
                <StyledRow key={`row:${i}`}>
                    <ShowcaseHead key={`head:${i}`}>{head}</ShowcaseHead>
                    {colsList.map(([, colProps], j) => (
                        <Component key={`${i}${j}`} {...handlers} {...props} {...rowProps} {...colProps} />
                    ))}
                </StyledRow>
            ))}
        </StyledGrid>
    );
};
