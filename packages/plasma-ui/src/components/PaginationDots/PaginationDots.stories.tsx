import React from 'react';
import { Story, Meta } from '@storybook/react';
import styled from 'styled-components';
import { IconChevronLeft, IconChevronRight } from '@sberdevices/plasma-icons';

import { ShowcaseComponentRow } from '../../helpers';
import { ActionButton } from '../Button';
import { Caption } from '../Typography';

import { SmartPaginationDots, SmartPaginationDotsProps, PaginationDots, PaginationDot } from '.';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledButtonGroup = styled.div`
    display: flex;
    align-self: center;
    align-items: center;
`;
const StyledGhostButton = styled(ActionButton).attrs(() => ({ view: 'clear', outlined: false }))`
    padding: 0;
`;

const rows = Array.from({ length: 4 }, () => [0, 0, 0, 0]);

export default {
    title: 'Controls/PaginationDots',
} as Meta;

export const Default = () => {
    return (
        <>
            {rows.map((items, i) => (
                <ShowcaseComponentRow key={`row:${i}`}>
                    <PaginationDots>
                        {items.map((_, j) => (
                            <PaginationDot key={`item:${i}${j}`} isActive={j === i} />
                        ))}
                    </PaginationDots>
                </ShowcaseComponentRow>
            ))}
        </>
    );
};

export const Limited: Story<SmartPaginationDotsProps & { itemsCount: number }> = ({ itemsCount, visibleItems }) => {
    const [currentIndex, setIndex] = React.useState(0);
    const items = Array(itemsCount)
        .fill(0)
        .map((_, i) => ({ id: i }));
    const minIndex = 0;
    const maxIndex = items.length - 1;

    return (
        <StyledWrapper>
            <SmartPaginationDots items={items} index={currentIndex} visibleItems={visibleItems} />
            <StyledButtonGroup>
                <StyledGhostButton
                    onClick={() => setIndex(currentIndex - 1 >= minIndex ? currentIndex - 1 : maxIndex)}
                    size="s"
                >
                    <IconChevronLeft size="xs" />
                </StyledGhostButton>
                <Caption>{currentIndex}</Caption>
                <StyledGhostButton
                    onClick={() => setIndex(currentIndex + 1 <= maxIndex ? currentIndex + 1 : minIndex)}
                    size="s"
                >
                    <IconChevronRight size="xs" />
                </StyledGhostButton>
            </StyledButtonGroup>
        </StyledWrapper>
    );
};

Limited.args = {
    visibleItems: 7,
    itemsCount: 10,
};

Limited.parameters = {
    chromatic: {
        disable: true,
    },
};
