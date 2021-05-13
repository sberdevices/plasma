import React from 'react';
import styled from 'styled-components';
import { number } from '@storybook/addon-knobs';

import { Button } from '../Button';
import { Headline4 } from '../Typography';

import { SmartPaginationDots, PaginationDots, PaginationDot } from '.';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledButtonGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(3, max-content);
    grid-gap: 1.25rem;
    align-self: center;
    align-items: center;
    margin-top: 2rem;
`;

export const Default = () => {
    const items = Array(number('Items count', 10))
        .fill(0)
        .map((_, i) => ({ id: i }));

    return (
        <PaginationDots>
            {items.map((_, i) => (
                <PaginationDot key={`item:${i}`} isActive={i === 0} />
            ))}
        </PaginationDots>
    );
};

export const Limited = () => {
    const [index, setIndex] = React.useState(number('index', 0));
    const items = Array(number('Items count', 10))
        .fill(0)
        .map((_, i) => ({ id: i }));

    return (
        <StyledWrapper>
            <SmartPaginationDots
                items={items}
                index={index}
                visibleItems={number('visibleItems', 7)}
                onIndexChange={(i) => setIndex(i)}
            />
            <StyledButtonGroup>
                <Button text="Prev" onClick={() => setIndex((i) => (i > 0 ? i - 1 : items.length - 1))} />
                <Headline4>{index}</Headline4>
                <Button text="Next" onClick={() => setIndex((i) => (i < items.length - 1 ? i + 1 : 0))} />
            </StyledButtonGroup>
        </StyledWrapper>
    );
};

Limited.parameters = {
    chromatic: {
        disable: true,
    },
};
