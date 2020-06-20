import React from 'react';
import { number } from '@storybook/addon-knobs';
import styled from 'styled-components';

import { Scroller } from './Scroller';

export default {
    title: 'Scroller',
};

const StyledItem = styled.div<{ width: number; height: number }>`
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
    border-radius: 10px;
    box-sizing: 'border-box';
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    background-color: #4a4a4a;
`;

function createItems(count: number) {
    const items = [];
    for (let i = 0; i < count; i++) {
        items.push(i);
    }

    return items;
}

export const Default = () => {
    const items = createItems(number('Total items', 12));

    return (
        <Scroller index={number('Index', 0)} gap={number('Gap', 32)}>
            {items.map((i) => (
                <StyledItem key={i} width={number('ItemWidth', 420)} height={number('ItemHeight', 640)}>
                    {i + 1}
                </StyledItem>
            ))}
        </Scroller>
    );
};
