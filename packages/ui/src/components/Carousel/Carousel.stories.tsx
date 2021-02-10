import React from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';

import type { SnapType, SnapAlign } from '../../types';
import { isSberBox } from '../../utils';
import { ProductCard, MusicCard, GalleryCard } from '../Card/Card.examples';
import { Row } from '../Grid';

import { CarouselSection, ScalingColCard, scaleCallback, scaleResetCallback } from './Carousel.examples';

import { CarouselGridWrapper, Carousel, CarouselItem, CarouselCol, useRemoteHandlers } from '.';

const items = Array(100)
    .fill({
        title: 'Заголовок',
        subtitle: 'Описание уравнение времени, сублимиpуя с повеpхности ядpа кометы, вращает реликтовый ледник',
        imageSrc: '/images/320_320_n.jpg',
    })
    .map(({ title, subtitle, imageSrc }, i) => ({
        title: `${title} ${i}`,
        subtitle: `${subtitle} ${i}`,
        imageSrc: imageSrc.replace('n', i % 12),
    }));

const snapTypes = ['mandatory', 'proximity'] as SnapType[];
const snapAlign = ['start', 'center', 'end'] as SnapAlign[];

export const Basic = () => {
    const axis = 'x';
    const isSberbox = isSberBox();
    const delay = isSberbox ? 300 : 30;
    const longDelay = isSberbox ? 1500 : 150;
    const [index, setIndex] = useRemoteHandlers({
        initialIndex: 0,
        axis,
        delay,
        longDelay,
        min: 0,
        max: items.length - 1,
    });

    const animatedScrollByIndex = boolean('animatedScrollByIndex', isSberbox);
    const scrollAlign = select('scrollAlign', ['center', 'start'], 'start');
    const scrollSnapType = !isSberbox ? select('scrollSnapType', snapTypes, 'mandatory') : undefined;
    const scrollSnapAlign = !isSberbox ? select('scrollSnapAlign', snapAlign, 'start') : undefined;
    const detectActive = boolean('detectActive', true) as true;
    const detectThreshold = number('detectThreshold', 0.5);

    return (
        <CarouselGridWrapper>
            <Carousel
                as={Row}
                axis={axis}
                index={index}
                animatedScrollByIndex={animatedScrollByIndex}
                scrollAlign={scrollAlign}
                scrollSnapType={scrollSnapType}
                detectActive={detectActive}
                detectThreshold={detectThreshold}
                onIndexChange={(i) => setIndex(i)}
                style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem' }}
            >
                {items.map(({ title, subtitle }, i) => (
                    <CarouselCol key={`item:${i}`} size={3} sizeXL={4} scrollSnapAlign={scrollSnapAlign}>
                        <ProductCard
                            title={title}
                            subtitle={subtitle}
                            focused={i === index}
                            imageSrc={`/images/320_320_${i % 12}.jpg`}
                        />
                    </CarouselCol>
                ))}
            </Carousel>
        </CarouselGridWrapper>
    );
};

export const Vertical = () => {
    const axis = 'y';
    const [index, setIndex] = useRemoteHandlers({
        initialIndex: 0,
        axis,
        delay: 30,
        longDelay: 150,
        min: 0,
        max: items.length - 1,
    });

    const animatedScrollByIndex = boolean('animatedScrollByIndex', false);
    const scrollAlign = select('scrollAlign', ['center', 'start'], 'center');
    const scrollSnapType = select('scrollSnapType', snapTypes, 'mandatory');
    const scrollSnapAlign = select('scrollSnapAlign', snapAlign, 'center');
    const detectActive = boolean('detectActive', true) as true;
    const detectThreshold = number('detectThreshold', 0.5);

    return (
        <Carousel
            as={Row}
            axis={axis}
            index={index}
            animatedScrollByIndex={animatedScrollByIndex}
            scrollAlign={scrollAlign}
            scrollSnapType={scrollSnapType}
            detectActive={detectActive}
            detectThreshold={detectThreshold}
            onIndexChange={(i) => setIndex(i)}
            paddingStart="50%"
            paddingEnd="50%"
            style={{
                height: '100vh',
                maxHeight: '40rem',
                width: '100%',
                maxWidth: '22.5rem',
                margin: '0 auto',
                padding: '0.75rem',
            }}
        >
            {items.map(({ title, subtitle }, i) => (
                <CarouselItem key={`item:${i}`} scrollSnapAlign={scrollSnapAlign} style={{ padding: '0.75rem 0' }}>
                    <GalleryCard
                        title={title}
                        subtitle={subtitle}
                        focused={i === index}
                        imageSrc={`/images/320_320_${i % 12}.jpg`}
                        imageRatio="1:1"
                        scaleOnFocus
                    />
                </CarouselItem>
            ))}
        </Carousel>
    );
};

export const MusicPage: React.FC = () => {
    const isSberbox = isSberBox();
    const scrollSnapType = !isSberbox ? select('scrollSnapType', snapTypes, 'mandatory') : undefined;
    const scrollSnapAlign = !isSberbox ? select('scrollSnapAlign', snapAlign, 'start') : undefined;

    return (
        <>
            <CarouselSection heading="Новые альбомы" scrollSnapType={scrollSnapType}>
                {items.map((item, i) => (
                    <CarouselCol key={`item:${i}`} size={2} sizeM={1.5} scrollSnapAlign={scrollSnapAlign}>
                        <MusicCard {...item} imageRatio="1:1" />
                    </CarouselCol>
                ))}
            </CarouselSection>
            <CarouselSection heading="Хиты и чарты" scrollSnapType={scrollSnapType}>
                {items.map((item, i) => (
                    <CarouselCol key={`item:${i}`} size={4} sizeM={3} scrollSnapAlign={scrollSnapAlign}>
                        <MusicCard {...item} imageRatio="9:16" />
                    </CarouselCol>
                ))}
            </CarouselSection>
            <CarouselSection heading="Жанры и настроения" scrollSnapType={scrollSnapType}>
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
    const isSberbox = isSberBox();
    const delay = isSberbox ? 300 : 30;
    const longDelay = isSberbox ? 1500 : 150;
    const [index, setIndex] = useRemoteHandlers({
        initialIndex: 0,
        axis: 'x',
        delay,
        longDelay,
        min: 0,
        max: items.length - 1,
    });

    const animatedScrollByIndex = boolean('animatedScrollByIndex', isSberbox);
    const scrollSnapType = !isSberbox ? select('scrollSnapType', snapTypes, 'mandatory') : undefined;
    const scrollSnapAlign = !isSberbox ? select('scrollSnapAlign', snapAlign, 'center') : undefined;
    const detectActive = boolean('detectActive', true) as true;
    const detectThreshold = number('detectThreshold', 0.5);

    return (
        <CarouselGridWrapper>
            <Carousel
                as={Row}
                axis="x"
                index={index}
                animatedScrollByIndex={animatedScrollByIndex}
                scrollSnapType={scrollSnapType}
                detectActive={detectActive}
                detectThreshold={detectThreshold}
                scaleCallback={scaleCallback}
                scaleResetCallback={scaleResetCallback}
                onIndexChange={(i) => setIndex(i)}
                paddingStart="50%"
                paddingEnd="50%"
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
        </CarouselGridWrapper>
    );
};
