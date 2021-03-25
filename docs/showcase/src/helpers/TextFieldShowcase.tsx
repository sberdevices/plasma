import React from 'react';
import styled from 'styled-components';
import type { TextFieldProps } from '@sberdevices/ui/components/TextField';

import { actionWithPersistedEvent } from './actionWithPersistedEvent';
import { ShowcaseHead } from './Showcase';

const StyledGrid = styled.div<{ $cols: number }>`
    display: grid;
    grid-template-columns: max-content repeat(${({ $cols }) => $cols}, 20rem);
    grid-gap: 2rem;
`;
const StyledRow = styled.div`
    display: contents;
`;

const onChange = actionWithPersistedEvent('onChange');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');
const handlers = { onChange, onFocus, onBlur };

/**
 * Шоукейсы - обертки для демонстрации / тестирования полной раскладки презентуемого компонента.
 */
export const Showcase = ({
    props,
    rows,
    cols,
    component: TextField,
}: {
    props: TextFieldProps;
    rows: Record<string, TextFieldProps>;
    cols: Record<string, TextFieldProps>;
    component: any;
}) => {
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
                <StyledRow>
                    <ShowcaseHead key={`head:${i}`}>{head}</ShowcaseHead>
                    {colsList.map(([, colProps], j) => (
                        <TextField key={`${i}${j}`} {...handlers} {...props} {...rowProps} {...colProps} />
                    ))}
                </StyledRow>
            ))}
        </StyledGrid>
    );
};
