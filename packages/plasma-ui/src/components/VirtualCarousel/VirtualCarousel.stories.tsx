import React from 'react';
import { Story, Meta } from '@storybook/react';
import type { SnapType, SnapAlign } from '@sberdevices/plasma-core';

import { isSberBox } from '../../utils';
import { ProductCard, MusicCard, GalleryCard } from '../Card/Card.examples';
import { DeviceThemeProvider } from '../Device';
import { Row } from '../Grid';
import { Body3 } from '../Typography/Body';
import { useRemoteHandlers } from '../Carousel';

import {
    VirtualCarouselGridWrapper,
    VirtualCarousel,
    VirtualCarouselItem,
    VirtualCarouselCol,
    VirtualCarouselProps,
    VirtualCarouselCarouselColProps,
} from '.';

const items = Array(100)
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

const snapTypes = ['mandatory', 'proximity'] as SnapType[];
const snapAlign = ['start', 'center', 'end'] as SnapAlign[];

const isSberbox = isSberBox();

export default {
    title: 'Controls/VirtualCarousel2',
} as Meta;

export const Basic: Story<VirtualCarouselProps & VirtualCarouselCarouselColProps & { displayGrid: boolean }> = ({
    scrollAlign,
    scrollSnapType,
    scrollSnapAlign,
    detectActive,
    detectThreshold,
}) => {
    const axis = 'x';
    const delay = isSberbox ? 300 : 30;
    const longDelay = isSberbox ? 1500 : 150;
    const [index] = useRemoteHandlers({
        initialIndex: 0,
        axis,
        delay,
        longDelay,
        min: 0,
        max: items.length - 1,
    });

    return (
        <DeviceThemeProvider>
            <VirtualCarouselGridWrapper>
                <VirtualCarousel
                    as={Row}
                    index={index}
                    axis={axis}
                    scrollAlign={scrollAlign}
                    scrollSnapType={scrollSnapType}
                    detectActive={detectActive as true}
                    detectThreshold={detectThreshold}
                    style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem', height: '165px', width: '100vw' }}
                    itemCount={items.length}
                    estimateSize={() => 800}
                    overscan={6}
                    carouselHeight={165}
                    renderItems={(visibleItems, currentIndex) =>
                        visibleItems.map(({ index, start }) => {
                            const item = items[index];
                            const { title, subtitle } = item;
                            return (
                                <VirtualCarouselCol
                                    axis={axis}
                                    start={start}
                                    key={index}
                                    size={3}
                                    sizeXL={4}
                                    scrollSnapAlign={scrollSnapAlign}
                                    aria-label={`${index + 1} из ${items.length}`}
                                >
                                    <ProductCard
                                        title={title}
                                        subtitle={subtitle}
                                        imageSrc={`${process.env.PUBLIC_URL}/images/320_320_${index % 12}.jpg`}
                                        focused={index === currentIndex}
                                    />
                                </VirtualCarouselCol>
                            );
                        })
                    }
                />
            </VirtualCarouselGridWrapper>
        </DeviceThemeProvider>
    );
};

Basic.args = {
    displayGrid: true,
    scrollAlign: 'start',
    scrollSnapType: !isSberbox ? 'mandatory' : undefined,
    scrollSnapAlign: !isSberbox ? 'start' : undefined,
    detectActive: true,
    detectThreshold: 0.5,
};

Basic.argTypes = {
    scrollAlign: {
        control: {
            type: 'select',
            options: ['center', 'start', 'end', 'activeDirection'],
        },
    },
    scrollSnapType: {
        control: {
            type: 'inline-radio',
            options: snapTypes,
        },
    },
    scrollSnapAlign: {
        control: {
            type: 'inline-radio',
            options: snapAlign,
        },
    },
};

// это пока можно не смотреть

export const Vertical: Story<VirtualCarouselProps & VirtualCarouselCarouselColProps & { displayGrid: boolean }> = ({
    scrollAlign,
    scrollSnapType,
    scrollSnapAlign,
    detectActive,
    detectThreshold,
}) => {
    const axis = 'y';

    return (
        <DeviceThemeProvider>
            <VirtualCarousel
                axis={axis}
                scrollAlign={scrollAlign}
                scrollSnapType={scrollSnapType}
                detectActive={detectActive as true}
                detectThreshold={detectThreshold}
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
                itemCount={items.length}
                estimateSize={() => 374}
                overscan={6}
                carouselHeight={700}
                renderItems={(visibleItems, currentIndex) =>
                    visibleItems.map(({ index, start }) => {
                        const item = items[index];
                        const { title, subtitle } = item;
                        return (
                            <VirtualCarouselItem
                                key={index}
                                start={start}
                                scrollSnapAlign={scrollSnapAlign}
                                style={{ padding: '0.75rem 0' }}
                                aria-label={`${index + 1} из ${items.length}`}
                                axis={axis}
                            >
                                <GalleryCard
                                    title={title}
                                    subtitle={subtitle}
                                    focused={index === currentIndex}
                                    imageSrc={`${process.env.PUBLIC_URL}/images/320_320_${index % 12}.jpg`}
                                    imageRatio="1 / 1"
                                    scaleOnFocus
                                    tabIndex={0}
                                />
                            </VirtualCarouselItem>
                        );
                    })
                }
            />
        </DeviceThemeProvider>
    );
};

Vertical.args = {
    ...Basic.args,
};

Vertical.argTypes = {
    ...Basic.argTypes,
};

interface MusicPageProps {
    displayGrid: boolean;
    scrollSnapType: SnapType;
    scrollSnapAlign: SnapAlign;
}

export const MusicPage: Story<MusicPageProps> = ({ scrollSnapType, scrollSnapAlign }) => {
    return (
        <DeviceThemeProvider>
            <section style={{ margin: '1.75rem 0' }}>
                <Body3 style={{ marginBottom: '1rem' }}>Новые альбомы</Body3>
                <VirtualCarouselGridWrapper>
                    <VirtualCarousel
                        as={Row}
                        axis="x"
                        index={0}
                        scrollSnapType={scrollSnapType}
                        style={{ height: '365px', width: '100vw' }}
                        itemCount={items.length}
                        estimateSize={() => 327}
                        overscan={6}
                        carouselHeight={365}
                        renderItems={(visibleItems) => {
                            return visibleItems.map(({ index, start }) => {
                                const item = items[index];
                                return (
                                    <VirtualCarouselCol
                                        key={`item:${index}`}
                                        size={2}
                                        start={start}
                                        sizeM={1.5}
                                        scrollSnapAlign={scrollSnapAlign}
                                        axis="x"
                                        style={{
                                            width: 311,
                                            height: 365,
                                        }}
                                    >
                                        <MusicCard {...item} style={{ width: 311, height: 311 }} imageRatio="1 / 1" />
                                    </VirtualCarouselCol>
                                );
                            });
                        }}
                    />
                </VirtualCarouselGridWrapper>
            </section>
            <section style={{ margin: '1.75rem 0' }}>
                <Body3 style={{ marginBottom: '1rem' }}>Хиты и чарты</Body3>
                <VirtualCarouselGridWrapper>
                    <VirtualCarousel
                        as={Row}
                        axis="x"
                        index={0}
                        scrollSnapType={scrollSnapType}
                        style={{ height: '412px', width: '100vw' }}
                        itemCount={items.length}
                        estimateSize={() => 650}
                        overscan={6}
                        carouselHeight={412}
                        renderItems={(visibleItems) => {
                            return visibleItems.map(({ index, start }) => {
                                const item = items[index];
                                return (
                                    <VirtualCarouselCol
                                        start={start}
                                        key={`item:${index}`}
                                        size={4}
                                        sizeM={3}
                                        scrollSnapAlign={scrollSnapAlign}
                                        axis="x"
                                        style={{ height: 412, width: 638 }}
                                    >
                                        <MusicCard {...item} style={{ height: 358, width: 638 }} imageRatio="16 / 9" />
                                    </VirtualCarouselCol>
                                );
                            });
                        }}
                    />
                </VirtualCarouselGridWrapper>
            </section>
            <section style={{ margin: '1.75rem 0' }}>
                <Body3 style={{ marginBottom: '1rem' }}>Жанры и настроения</Body3>
                <VirtualCarouselGridWrapper>
                    <VirtualCarousel
                        as={Row}
                        axis="x"
                        index={0}
                        scrollSnapType={scrollSnapType}
                        style={{ height: '320px', width: '100vw' }}
                        itemCount={items.length}
                        estimateSize={() => 490}
                        overscan={6}
                        carouselHeight={320}
                        renderItems={(visibleItems) => {
                            return visibleItems.map(({ index, start }) => {
                                const item = items[index];
                                return (
                                    <VirtualCarouselCol
                                        start={start}
                                        key={`item:${index}`}
                                        size={3}
                                        sizeM={2}
                                        scrollSnapAlign={scrollSnapAlign}
                                        axis="x"
                                        style={{ width: 475, height: 320 }}
                                    >
                                        <MusicCard {...item} style={{ width: 475, height: 267 }} imageRatio="16 / 9" />
                                    </VirtualCarouselCol>
                                );
                            });
                        }}
                    />
                </VirtualCarouselGridWrapper>
            </section>
        </DeviceThemeProvider>
    );
};

MusicPage.args = {
    displayGrid: true,
    scrollSnapType: 'mandatory',
    scrollSnapAlign: 'start',
};

MusicPage.argTypes = {
    ...Basic.argTypes,
};
