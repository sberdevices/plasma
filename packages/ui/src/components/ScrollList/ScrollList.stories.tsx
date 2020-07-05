import React from 'react';
import { action } from '@storybook/addon-actions';
import styled, { css } from 'styled-components';
import { number } from '@storybook/addon-knobs';

import Story from '../../helpers/Story';

import ListContext from './ListContext';
import HScrollList from './HScrollList';
import VScrollList from './VScrollList';

interface ListItemProps {
    active: boolean;
    width: number;
    height: number;
}

const StyledListItemBody = styled.div`
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    height: 100%;
`;

const StyledListItemRoot = styled.div<ListItemProps>`
    box-sizing: border-box;
    padding: 20px;
    ${({ width, height }) => css`
        width: ${width}px;
        height: ${height}px;
    `}

    ${({ active }) =>
        active &&
        css`
            ${StyledListItemBody} {
                background-color: #080;
            }
        `}
`;

const StyledHScrollList = styled(HScrollList)`
    width: 1800px;
    background-color: #4c4c4c;
    padding: 30px 0;
`;

const StyledVScrollList = styled(VScrollList)`
    background-color: #4c4c4c;
    height: 1000px;
    width: 100%;
    position: relative;
`;

const ListItem: React.FC<ListItemProps> = ({ active, width, height, children }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const ctx = React.useContext(ListContext);

    React.useEffect(() => {
        ctx.register(ref);

        return () => ctx.unregister(ref);
    }, [ctx]);

    return (
        <StyledListItemRoot ref={ref} width={width} height={height} active={active}>
            <StyledListItemBody>{children}</StyledListItemBody>
        </StyledListItemRoot>
    );
};

export default {
    title: 'ScrollList',
};

export const Horizontal = () => {
    const items = Array(number('Item count', 12)).fill(0);
    const itemWidth = number('Item width', 400);
    const index = number('Index', 0);

    let itemIndex = index;
    if (itemIndex < 0) {
        itemIndex = 0;
    } else if (itemIndex > items.length - 1) {
        itemIndex = items.length - 1;
    }

    return (
        <Story>
            <StyledHScrollList itemWidth={itemWidth} index={itemIndex} onChange={action('index change')}>
                {items.map((_, i) => (
                    <ListItem active={i === itemIndex} width={itemWidth} height={300} key={`item:${i}`}>
                        {i}
                    </ListItem>
                ))}
            </StyledHScrollList>
        </Story>
    );
};

export const Vertical = () => {
    const items = Array(number('Item count', 12)).fill(0);
    const itemHeight = number('Item height', 200);
    const index = number('Index', 0);

    let itemIndex = index;
    if (itemIndex < 0) {
        itemIndex = 0;
    } else if (itemIndex > items.length - 1) {
        itemIndex = items.length - 1;
    }

    return (
        <Story>
            <StyledVScrollList itemHeight={itemHeight} index={itemIndex} onChange={action('index change')}>
                {items.map((_, i) => (
                    <ListItem active={i === itemIndex} width={600} height={itemHeight} key={`item:${i}`}>
                        {i}
                    </ListItem>
                ))}
            </StyledVScrollList>
        </Story>
    );
};
