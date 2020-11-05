import React from 'react';
import { action } from '@storybook/addon-actions';
import styled, { css } from 'styled-components';
import { number } from '@storybook/addon-knobs';

import { Filler } from '../../helpers/Filler';
import { Col, Container, Row } from '../Grid/Grid';

import { ListContext } from './ListContext';
import { ScrollListCalcPosition, ScrollList } from './ScrollList';

interface ListItemProps {
    active: boolean;
    width: number;
    height: number;
}

interface ListGridItemProps {
    size?: number;
    active?: boolean;
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

const StyledHScrollList = styled(ScrollList)`
    width: 100%;
    padding: 30px 0;
`;

const StyledVScrollList = styled(ScrollList)`
    height: 100%;
    width: 100%;
    max-height: 75vh;
    position: relative;
`;

const StyledFiller = styled(Filler)<{ active?: boolean }>`
    height: 200px;

    ${({ active }) => active && 'background-color: rebeccapurple'};
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

const ListGridItem: React.FC<ListGridItemProps> = ({ size, active, children }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const ctx = React.useContext(ListContext);

    React.useEffect(() => {
        ctx.register(ref);

        return () => ctx.unregister(ref);
    }, [ctx]);

    return (
        <Col ref={ref} size={size}>
            <StyledFiller active={active}>{children}</StyledFiller>
        </Col>
    );
};

export default {
    title: 'ScrollList',
    decorators: [
        (Story) => (
            <div style={{ fontSize: '16px' }}>
                <Story />
            </div>
        ),
    ],
};

export const HorizontalFixedWidth = () => {
    const items = Array(number('Item count', 12)).fill(0);
    const itemWidth = number('Item width', 270);
    const index = number('Index', 0);

    let itemIndex = index;

    if (itemIndex < 0) {
        itemIndex = 0;
    } else if (itemIndex > items.length - 1) {
        itemIndex = items.length - 1;
    }

    return (
        <StyledHScrollList offset={100} axis="x" index={itemIndex} onChange={action('index change')}>
            {items.map((_, i) => (
                <ListItem active={i === itemIndex} width={itemWidth} height={300} key={`item:${i}`}>
                    {i}
                </ListItem>
            ))}
        </StyledHScrollList>
    );
};

export const HorizontalArbitaryWidth = () => {
    const index = number('Index', 0);
    const count = 11;

    let itemIndex = index;

    if (itemIndex < 0) {
        itemIndex = 0;
    } else if (itemIndex > count) {
        itemIndex = count;
    }

    return (
        <StyledHScrollList axis="x" index={itemIndex} onChange={action('index change')}>
            <ListItem key="item:0" active={itemIndex === 0} width={200} height={300}>
                0
            </ListItem>
            <ListItem key="item:1" active={itemIndex === 1} width={250} height={300}>
                1
            </ListItem>
            <ListItem key="item:2" active={itemIndex === 2} width={350} height={300}>
                2
            </ListItem>
            <ListItem key="item:3" active={itemIndex === 3} width={300} height={300}>
                3
            </ListItem>
            <ListItem key="item:4" active={itemIndex === 4} width={150} height={300}>
                4
            </ListItem>
            <ListItem key="item:5" active={itemIndex === 5} width={200} height={300}>
                5
            </ListItem>
            <ListItem key="item:6" active={itemIndex === 6} width={400} height={300}>
                6
            </ListItem>
            <ListItem key="item:7" active={itemIndex === 7} width={200} height={300}>
                7
            </ListItem>
            <ListItem key="item:8" active={itemIndex === 8} width={250} height={300}>
                8
            </ListItem>
            <ListItem key="item:9" active={itemIndex === 9} width={450} height={300}>
                9
            </ListItem>
            <ListItem key="item:10" active={itemIndex === 10} width={200} height={300}>
                10
            </ListItem>
            <ListItem key="item:11" active={itemIndex === 11} width={250} height={300}>
                11
            </ListItem>
        </StyledHScrollList>
    );
};

export const VerticalFixedHeight = () => {
    const items = Array(number('Item count', 12)).fill(0);
    const itemHeight = number('Item height', 140);
    const index = number('Index', 0);

    let itemIndex = index;

    if (itemIndex < 0) {
        itemIndex = 0;
    } else if (itemIndex > items.length - 1) {
        itemIndex = items.length - 1;
    }

    return (
        <StyledVScrollList axis="y" index={itemIndex} onChange={action('index change')}>
            {items.map((_, i) => (
                <ListItem active={i === itemIndex} width={600} height={itemHeight} key={`item:${i}`}>
                    {i}
                </ListItem>
            ))}
        </StyledVScrollList>
    );
};

export const VerticalArbitaryHeight = () => {
    const index = number('Index', 0);
    const count = 11;

    let itemIndex = index;

    if (itemIndex < 0) {
        itemIndex = 0;
    } else if (itemIndex > count) {
        itemIndex = count;
    }

    return (
        <StyledVScrollList axis="y" index={itemIndex} onChange={action('index change')}>
            <ListItem key="item:0" active={itemIndex === 0} height={200} width={600}>
                0
            </ListItem>
            <ListItem key="item:1" active={itemIndex === 1} height={250} width={600}>
                1
            </ListItem>
            <ListItem key="item:2" active={itemIndex === 2} height={350} width={600}>
                2
            </ListItem>
            <ListItem key="item:3" active={itemIndex === 3} height={300} width={600}>
                3
            </ListItem>
            <ListItem key="item:4" active={itemIndex === 4} height={150} width={600}>
                4
            </ListItem>
            <ListItem key="item:5" active={itemIndex === 5} height={200} width={600}>
                5
            </ListItem>
            <ListItem key="item:6" active={itemIndex === 6} height={400} width={600}>
                6
            </ListItem>
            <ListItem key="item:7" active={itemIndex === 7} height={200} width={600}>
                7
            </ListItem>
            <ListItem key="item:8" active={itemIndex === 8} height={250} width={600}>
                8
            </ListItem>
            <ListItem key="item:9" active={itemIndex === 9} height={450} width={600}>
                9
            </ListItem>
            <ListItem key="item:10" active={itemIndex === 10} height={200} width={600}>
                10
            </ListItem>
            <ListItem key="item:11" active={itemIndex === 11} height={250} width={600}>
                11
            </ListItem>
        </StyledVScrollList>
    );
};

export const VerticalWithCustomCalcPosition = () => {
    const items = Array(number('Item count', 12)).fill(0);
    const index = number('Index', 0);

    let itemIndex = index;

    if (itemIndex < 0) {
        itemIndex = 0;
    } else if (itemIndex > items.length - 1) {
        itemIndex = items.length - 1;
    }

    /**
     * Скроллим верхний блок
     */
    const calcPosition: ScrollListCalcPosition = ({ index: indexPosition, offset, item }) => {
        if (indexPosition < 0) {
            return -offset;
        }

        let position = -offset;

        if (item && indexPosition > 0) {
            position = item.offsetTop - offset;
        }

        return position;
    };

    return (
        <StyledVScrollList axis="y" index={itemIndex} calcPosition={calcPosition} onChange={action('index change')}>
            {items.map((_, i) => (
                <ListItem active={i === itemIndex} width={600} height={200} key={`item:${i}`}>
                    {i}
                </ListItem>
            ))}
        </StyledVScrollList>
    );
};

export const CarouselInLayout = () => {
    const items = Array(number('Item count', 12)).fill(0);
    const index = number('Index', 0);

    let itemIndex = index;

    if (itemIndex < 0) {
        itemIndex = 0;
    } else if (itemIndex > items.length - 1) {
        itemIndex = items.length - 1;
    }

    return (
        <Container>
            <Row>
                <Col size={2}>
                    <Filler>Sidebar</Filler>
                </Col>
                <Col size={4}>
                    <Filler>Carousel</Filler>
                    <Row>
                        <StyledHScrollList axis="x" index={itemIndex}>
                            {items.map((_, i) => (
                                <ListGridItem key={`item:${i}`} size={1} active={i === itemIndex}>
                                    Card {i}
                                </ListGridItem>
                            ))}
                        </StyledHScrollList>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
