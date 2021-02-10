import React from 'react';
import styled from 'styled-components';
import { number } from '@storybook/addon-knobs';
import { IconChevronLeft, IconChevronRight } from '@sberdevices/plasma-icons';

import { ShowcaseComponentRow, InSpacingDecorator } from '../../helpers';
import { ActionButton } from '../Button';
import { Caption } from '../Typography';

import { SmartPaginationDots, PaginationDots, PaginationDot } from '.';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledButtonGroup = styled.div`
    display: flex;
    align-self: center;
    align-items: center;
`;
const StyledGhostButton = styled(ActionButton).attrs(() => ({ view: 'clear', size: 's', outlined: false }))`
    padding: 0;
`;

const rows = Array.from({ length: 4 }, () => [0, 0, 0, 0]);

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

export const Limited = () => {
    const [index, setIndex] = React.useState(number('index', 0));
    const items = Array(number('Items count', 10))
        .fill(0)
        .map((_, i) => ({ id: i }));
    const minIndex = 0;
    const maxIndex = items.length - 1;

    return (
        <StyledWrapper>
            <SmartPaginationDots items={items} index={index} visibleItems={number('visibleItems', 7)} />
            <StyledButtonGroup>
                <StyledGhostButton onClick={() => setIndex(index - 1 >= minIndex ? index - 1 : maxIndex)}>
                    <IconChevronLeft size="xs" />
                </StyledGhostButton>
                <Caption>{index}</Caption>
                <StyledGhostButton onClick={() => setIndex(index + 1 <= maxIndex ? index + 1 : minIndex)}>
                    <IconChevronRight size="xs" />
                </StyledGhostButton>
            </StyledButtonGroup>
        </StyledWrapper>
    );
};
