import React from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';

import { InSpacingDecorator, disableProps } from '../../helpers';
import { Button } from '../Button';
import { Image } from '../Image';
import { SmartPaginationDots } from '../PaginationDots';
import { Headline4, Footnote1 } from '../Typography';

import { Carousel, CarouselItem } from '.';

const propsToDisable = [
    'onScroll',
    'index',
    'scrollSnapType',
    'scrollAlign',
    'paddingStart',
    'paddingEnd',
    'detectActive',
    'detectThreshold',
    'onIndexChange',
    'scaleCallback',
    'scaleResetCallback',
    'as',
    'forwardedAs',
];

export default {
    title: 'Controls/Carousel',
    component: Carousel,
    decorators: [InSpacingDecorator],
    argTypes: {
        align: {
            control: {
                type: 'inline-radio',
                options: ['center', 'start', 'end'],
            },
        },
    },
} as Meta;

type alignType = 'center' | 'start' | 'end';

const items = Array(25)
    .fill({
        title: 'Заголовок',
        subtitle: 'Описание уравнение времени, сублимиpуя с повеpхности ядpа кометы, вращает реликтовый ледник',
        imageSrc: `${process.env.PUBLIC_URL}/images/320_320_n.jpg`,
    })
    .map(({ title, subtitle, imageSrc }, i) => ({
        id: i,
        title: `${title} ${i}`,
        subtitle: `${subtitle} ${i}`,
        imageSrc: imageSrc.replace('n', i % 12),
    }));

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
const StyledCard = styled.div`
    position: relative;
    border-radius: 1rem;
`;
const StyledCardContent = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1.72rem;
    color: #fff;
`;

export const Default: Story<{ align: string }> = ({ align }) => {
    const [index, setIndex] = React.useState(0);

    return (
        <StyledWrapper>
            <Carousel
                style={{ margin: '0 -0.5rem' }}
                index={index}
                detectActive
                onIndexChange={(i) => setIndex(i)}
                scrollAlign={align as alignType}
            >
                {items.map((item, i) => (
                    <CarouselItem
                        key={`item:${i}`}
                        style={{ width: 550, padding: '0 0.5rem' }}
                        scrollSnapAlign={align as alignType}
                    >
                        <StyledCard>
                            <Image src={item.imageSrc} ratio="16 / 9" base="div" />
                            <StyledCardContent>
                                <Headline4>{item.title}</Headline4>
                                <Footnote1>{item.subtitle}</Footnote1>
                            </StyledCardContent>
                        </StyledCard>
                    </CarouselItem>
                ))}
            </Carousel>
            <SmartPaginationDots items={items} index={index} visibleItems={7} onIndexChange={(i) => setIndex(i)} />
            <StyledButtonGroup>
                <Button text="Prev" onClick={() => setIndex((i) => (i > 0 ? i - 1 : items.length - 1))} />
                <Headline4>{index}</Headline4>
                <Button text="Next" onClick={() => setIndex((i) => (i < items.length - 1 ? i + 1 : 0))} />
            </StyledButtonGroup>
        </StyledWrapper>
    );
};

Default.args = {
    align: 'center',
};

Default.argTypes = {
    ...disableProps(propsToDisable),
};
