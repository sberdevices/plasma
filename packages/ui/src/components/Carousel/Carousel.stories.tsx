import React from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';

import { GridLines } from '../../helpers/GridLines';
import type { SnapType, SnapAlign } from '../../types';
import { isSberBox } from '../../utils';
import { ProductCard, MusicCard } from '../Card/Card.examples';
import { Container, Row } from '../Grid';

import {
    CarouselSection,
    ScalingColCard,
    scaleCallback,
    scaleResetCallback,
    useRemoteHandlers,
} from './Carousel.examples';

import { CarouselWrapper, Carousel, CarouselCol } from '.';

const items = Array(100)
    .fill({
        title: 'Заголовок',
        subtitle: 'Описание уравнение времени, сублимиpуя с повеpхности ядpа кометы, вращает реликтовый ледник',
        imageSrc: '/images/320_480_n.jpg',
    })
    .map(({ title, subtitle, imageSrc }, i) => ({
        title: `${title} ${i}`,
        subtitle: `${subtitle} ${i}`,
        imageSrc: imageSrc.replace('n', i % 6),
    }));

const snapTypes = ['mandatory', 'proximity'] as SnapType[];
const snapAlign = ['start', 'center', 'end'] as SnapAlign[];

export default {
    title: 'Carousel',
    decorators: [
        (Story) => (
            <div style={{ margin: '-16px' }}>
                {boolean('Display grid', true) && <GridLines />}
                <Container>
                    <Story />
                </Container>
            </div>
        ),
    ],
};

export const Basic = () => {
    const axis = 'x';
    const [index, setIndex] = useRemoteHandlers('x', 0, items.length - 1);

    const isSberbox = isSberBox();
    const animatedScrollByIndex = boolean('animatedScrollByIndex', isSberbox);
    const scrollSnap = boolean('scrollSnap', !isSberbox);
    const scrollSnapType = select('scrollSnapType', snapTypes, 'mandatory');
    const detectCentral = boolean('detectCentral', !isSberbox);
    const detectThreshold = number('detectThreshold', 0.5);

    return (
        <CarouselWrapper inContainer>
            <Row>
                <Carousel
                    axis={axis}
                    index={index}
                    animatedScrollByIndex={animatedScrollByIndex}
                    scrollSnap={scrollSnap}
                    scrollSnapType={scrollSnapType}
                    detectCentral={detectCentral}
                    detectThreshold={detectThreshold}
                    onIndexChange={(i) => setIndex(i)}
                    style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem' }}
                >
                    {items.map(({ title, subtitle }, i) => (
                        <CarouselCol key={`item:${i}`} size={3} sizeXL={4} scrollSnapAlign="start">
                            <ProductCard
                                title={title}
                                subtitle={subtitle}
                                focused={i === index}
                                imageSrc={`/images/96_96_${i % 6}.jpg`}
                            />
                        </CarouselCol>
                    ))}
                </Carousel>
            </Row>
        </CarouselWrapper>
    );
};

export const MusicPage: React.FC = () => {
    const scrollSnap = boolean('scrollSnap', true);
    const scrollSnapType = select('scrollSnapType', snapTypes, 'mandatory');
    const scrollSnapAlign = select('scrollSnapAlign', snapAlign, 'start');

    return (
        <>
            <CarouselSection heading="Новые альбомы" scrollSnap={scrollSnap} scrollSnapType={scrollSnapType}>
                {items.map((item, i) => (
                    <CarouselCol key={`item:${i}`} size={2} sizeM={1.5} scrollSnapAlign={scrollSnapAlign}>
                        <MusicCard {...item} imageRatio="1:1" />
                    </CarouselCol>
                ))}
            </CarouselSection>
            <CarouselSection heading="Хиты и чарты" scrollSnap={scrollSnap} scrollSnapType={scrollSnapType}>
                {items.map((item, i) => (
                    <CarouselCol key={`item:${i}`} size={4} sizeM={3} scrollSnapAlign={scrollSnapAlign}>
                        <MusicCard {...item} imageRatio="9:16" />
                    </CarouselCol>
                ))}
            </CarouselSection>
            <CarouselSection heading="Жанры и настроения" scrollSnap={scrollSnap} scrollSnapType={scrollSnapType}>
                {items.map((item, i) => (
                    <CarouselCol key={`item:${i}`} size={3} sizeM={2} scrollSnapAlign={scrollSnapAlign}>
                        <MusicCard {...item} imageRatio="9:16" />
                    </CarouselCol>
                ))}
            </CarouselSection>
        </>
    );
};

export const CenterItem: React.FC = () => {
    const [index, setIndex] = useRemoteHandlers('x', 0, items.length - 1);

    const isSberbox = isSberBox();
    const animatedScrollByIndex = boolean('animatedScrollByIndex', isSberbox);
    const scrollSnap = boolean('scrollSnap', !isSberbox);
    const scrollSnapType = select('scrollSnapType', snapTypes, 'mandatory');
    const scrollSnapAlign = select('scrollSnapAlign', snapAlign, 'center');
    const detectCentral = boolean('detectCentral', !isSberbox);
    const detectThreshold = number('detectThreshold', 0.5);
    const scaleCentral = boolean('scaleCentral', true);

    return (
        <CarouselWrapper inContainer>
            <Row>
                <Carousel
                    axis="x"
                    index={index}
                    animatedScrollByIndex={animatedScrollByIndex}
                    scrollSnap={scrollSnap}
                    scrollSnapType={scrollSnapType}
                    detectCentral={detectCentral}
                    detectThreshold={detectThreshold}
                    scaleCentral={scaleCentral}
                    scaleCallback={scaleCallback}
                    scaleResetCallback={scaleResetCallback}
                    onIndexChange={(i) => setIndex(i)}
                    overscrollLeft="50%"
                    overscrollRight="50%"
                    style={{ paddingTop: '5rem' }}
                >
                    {items.map((item, i) => (
                        <ScalingColCard
                            key={`item:${i}`}
                            scrollSnapAlign={scrollSnapAlign}
                            isActive={i === index}
                            item={item}
                        />
                    ))}
                </Carousel>
            </Row>
        </CarouselWrapper>
    );
};
