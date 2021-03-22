import React from 'react';
import styled from 'styled-components';
import { Headline4 } from '@sberdevices/ui/components/Typography';

import { actionWithPersistedEvent } from './actionWithPersistedEvent';
import { capitalize } from './capitalize';

const StyledGrid = styled.div<{ $cols: number }>`
    display: grid;
    grid-template-columns: repeat(${({ $cols }) => $cols}, 22.5rem);
    grid-gap: 2.5rem 5rem;
`;
const StyledHeadline4 = styled(Headline4)`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`;

const onClick = actionWithPersistedEvent('onClick');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');

const items = [
    [0, 0, 0, 0],
    [0, 0, 0],
    [0, 0],
];

/**
 * Шоукейсы - обертки для демонстрации / тестирования полной раскладки презентуемого компонента.
 */
export const Showcase = ({
    sizes,
    ...rest
}: {
    sizes: Record<string, number>;
    rows: Record<string, object>;
    cols: Record<string, object[]>;
    list: any;
    item: any;
}) => (
    <>
        {Object.entries(sizes).map(([size, height]) => (
            <React.Fragment key={size}>
                <StyledHeadline4>
                    Tabs {capitalize(size)} {height}
                </StyledHeadline4>
                <ShowcaseGrid {...rest} size={size} />
            </React.Fragment>
        ))}
    </>
);

const ShowcaseGrid = ({
    size,
    rows,
    cols,
    list: Tabs,
    item: TabItem,
}: {
    size: string;
    rows: Record<string, object>;
    cols: Record<string, object[]>;
    list: any;
    item: any;
}) => {
    const [index, setIndex] = React.useState(0);

    return (
        <StyledGrid $cols={Object.keys(cols).length}>
            {Object.entries(rows).map(([, row], i) =>
                Object.entries(cols).map(([, col], j) => (
                    <Tabs key={`${size}${i}${j}`} size={size} {...row} {...col[0]}>
                        {items[i % 3].map((_, k) => (
                            <TabItem
                                key={`${size}${i}${j}${k}`}
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
                )),
            )}
        </StyledGrid>
    );
};
