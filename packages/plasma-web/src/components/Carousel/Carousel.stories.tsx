import React from 'react';
import styled from 'styled-components';
import { boolean, number, select } from '@storybook/addon-knobs';

import { InSpacingDecorator } from '../../helpers';
import { Button } from '../Button';
import { Image } from '../Image';
import { Headline4, Footnote1 } from '../Typography';

import { Carousel, CarouselItem } from '.';

export default {
    title: 'Controls/Carousel',
    component: Carousel,
    decorators: [InSpacingDecorator],
};

const items = Array(25)
    .fill({
        title: 'Заголовок',
        subtitle: 'Описание уравнение времени, сублимиpуя с повеpхности ядpа кометы, вращает реликтовый ледник',
        imageSrc: `${process.env.PUBLIC_URL}/images/320_320_n.jpg`,
    })
    .map(({ title, subtitle, imageSrc }, i) => ({
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

export const Default = () => {
    const [index, setIndex] = React.useState(0);
    const align = select('scrollAlign', ['center', 'start', 'end'], 'center');

    return (
        <StyledWrapper>
            <Carousel
                style={{ margin: '0 -0.5rem' }}
                index={index}
                detectActive
                onIndexChange={(i) => setIndex(i)}
                scrollAlign={align}
            >
                {items.map((item, i) => (
                    <CarouselItem key={`item:${i}`} style={{ width: 550, padding: '0 0.5rem' }} scrollSnapAlign={align}>
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
            <StyledButtonGroup>
                <Button text="Prev" onClick={() => setIndex((i) => (i > 0 ? i - 1 : items.length))} />
                <Headline4>{index}</Headline4>
                <Button text="Next" onClick={() => setIndex((i) => (i < items.length - 1 ? i + 1 : 0))} />
            </StyledButtonGroup>
        </StyledWrapper>
    );
};
