import React, { ComponentType, useState } from 'react';
import styled from 'styled-components';

import { actionWithPersistedEvent } from './actionWithPersistedEvent';
import { ShowcaseHead } from './Showcase';

const StyledGrid = styled.div<{ $cols: number }>`
    display: grid;
    grid-template-columns: max-content repeat(${({ $cols }) => $cols}, 22.5rem);
    grid-gap: 1.25rem;
    align-items: center;
`;
const StyledRow = styled.div`
    display: contents;
`;

const onClick = actionWithPersistedEvent('onClick');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');

const items = [0, 1, 2];

/**
 * Шоукейсы - обертки для демонстрации / тестирования полной раскладки презентуемого компонента.
 */
export const B2CTabsShowcase = ({
    rows,
    cols,
    list: Tabs,
    item: TabItem,
}: {
    rows: Record<string, object>;
    cols: Record<string, object[]>;
    list: ComponentType<any>;
    item: ComponentType<any>;
}) => {
    const colsList = Object.entries(cols);
    const [index, setIndex] = useState(0);

    return (
        <StyledGrid $cols={Object.keys(cols).length}>
            <StyledRow>
                <div />
                {colsList.map(([head], i) => (
                    <ShowcaseHead key={`head:${i}`}>{head}</ShowcaseHead>
                ))}
            </StyledRow>
            {Object.entries(rows).map(([head, row], i) => {
                return (
                    <StyledRow key={`row:${i}`}>
                        <ShowcaseHead key={`head:${i}`}>{head}</ShowcaseHead>
                        {colsList.map(([, col], j) => (
                            <Tabs key={`${i}${j}`} {...row} {...col[0]}>
                                {items.map((_, k) => (
                                    <TabItem
                                        key={`${i}${j}${k}`}
                                        isActive={k === index}
                                        onClick={(e: any) => {
                                            setIndex(k);
                                            onClick(e);
                                        }}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        {...col[1]}
                                    />
                                ))}
                            </Tabs>
                        ))}
                    </StyledRow>
                );
            })}
        </StyledGrid>
    );
};
