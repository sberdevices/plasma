import React from 'react';
import styled from 'styled-components';
import { Carousel, CarouselItem } from '@sberdevices/plasma-web/components/Carousel';
import { Image } from '@sberdevices/plasma-web/components/Image';
import { Headline4, Footnote1 } from '@sberdevices/plasma-web/components/Typography';

import { InSpacingDecorator, WebStoryDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Carousel',
    component: Carousel,
    decorators: [WebStoryDecorator, InSpacingDecorator],
    chromatic: { delay: 700 },
};

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
    const align = 'center';

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
        </StyledWrapper>
    );
};
