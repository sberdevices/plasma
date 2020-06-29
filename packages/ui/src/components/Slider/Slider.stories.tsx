import React from 'react';
import { number } from '@storybook/addon-knobs';
import styled from 'styled-components';

import Story from '../../helpers/Story';

import { Slider } from './Slider';

export default {
    title: 'Slider',
};

const StyledItem = styled.div<{ width: number; height: number; gap: number }>`
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
    margin: ${({ gap }) => `0 ${gap}px`};
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    background-color: #ccc;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 10px 10px ${({ theme }) => theme.color.highlight};
    }

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }
`;

const StyledSlider = styled(Slider)`
    padding-top: 30px;
    padding-bottom: 30px;
    margin: 20px 0;
    background-color: #999;
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
        <Story>
            <StyledSlider index={number('Index', 0)} offsetLeft={100} offsetRight={100}>
                {items.map((i) => (
                    <StyledItem
                        key={i}
                        width={number('ItemWidth', 390)}
                        height={number('ItemHeight', 600)}
                        gap={number('Gap', 16)}
                    >
                        {i + 1}
                    </StyledItem>
                ))}
            </StyledSlider>
        </Story>
    );
};
