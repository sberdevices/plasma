import React from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';

import { Button } from '../Button';
import { Headline4 } from '../Typography';

import { SmartPaginationDots, PaginationDots, PaginationDot, SmartPaginationDotsProps } from '.';

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

export default {
    title: 'Controls/PaginationDots',
} as Meta;

export const Default: Story<{ itemsCount: number }> = ({ itemsCount }) => {
    const items = Array(itemsCount)
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

Default.args = {
    itemsCount: 10,
};

interface LimitedStoryProps extends SmartPaginationDotsProps {
    initialIndex: number;
    itemsCount: number;
}

export const Limited: Story<LimitedStoryProps> = ({ initialIndex, itemsCount, visibleItems }) => {
    const [index, setIndex] = React.useState(initialIndex);
    const items = Array(itemsCount)
        .fill(0)
        .map((_, i) => ({ id: i }));

    return (
        <StyledWrapper>
            <SmartPaginationDots
                items={items}
                index={index}
                visibleItems={visibleItems}
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

Limited.args = {
    initialIndex: 0,
    itemsCount: 10,
    visibleItems: 7,
};

Limited.parameters = {
    chromatic: {
        disable: true,
    },
};
