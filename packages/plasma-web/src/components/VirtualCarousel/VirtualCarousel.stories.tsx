import React, { useState } from 'react';
import styled from 'styled-components';
import { Meta } from '@storybook/react';
import { IconChevronLeft, IconChevronRight } from '@sberdevices/plasma-icons';

import { InSpacingDecorator } from '../../helpers';
import { Button } from '../Button';
import { SmartPaginationDots } from '../PaginationDots';

import { VirtualCarouselCard } from './VirtualCarousel.examples';

import { VirtualCarousel, VirtualCarouselItem } from '.';

export default {
    title: 'Controls/VirtualCarousel',
    component: VirtualCarousel,
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

const items = Array(25)
    .fill({
        title: 'Слайд',
        subtitle: 'Описание слайда',
        imageSrc: `${process.env.PUBLIC_URL}/images/320_320_n.jpg`,
        imageAlt: 'Картинка',
    })
    .map(({ title, subtitle, imageSrc, imageAlt }, i) => ({
        id: `slide_${i}`,
        title: `${title} ${i}`,
        subtitle: `${subtitle} ${i}`,
        imageSrc: imageSrc.replace('n', i % 12),
        imageAlt: `${imageAlt} ${i}`,
    }));

export const Default = () => {
    return (
        <VirtualCarousel
            index={0}
            itemCount={items.length}
            style={{ margin: '0 -0.5rem' }}
            height={200}
            overscan={6}
            estimateSize={() => 336 + 16}
            renderItems={(visibleItems, currentIndex) =>
                visibleItems.map(({ index, start }) => {
                    const item = items[index];
                    return (
                        <VirtualCarouselItem
                            key={index}
                            data-virtual-index={index}
                            style={{
                                transform: `translateX(${start}px)`,
                                padding: '0 8px',
                            }}
                        >
                            <VirtualCarouselCard {...item} style={{ height: '180px', width: '336px' }} />
                        </VirtualCarouselItem>
                    );
                })
            }
        />
    );
};
/*
const StyledWrapper = styled.div`
    width: 32.5rem;
    margin-left: auto;
    margin-right: auto;
`;
const StyledCarouselWrapper = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
`;
const StyledControls = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 1;
`;
const StyledCarousel = styled(VirtualCarousel)`
    display: flex;
    padding: 0.5rem 0;
`;
const StyledCarouselItem = styled(VirtualCarouselItem)`
    width: 32.5rem;
    padding: 0 0.5rem;
    box-sizing: border-box;
`;

export const AccessabilityDemo = () => {
    const [index, setIndex] = useState(0);
    const [ariaLive, setAriaLive] = useState<'off' | 'polite'>('off');

    return (
        <StyledWrapper>
            <StyledCarouselWrapper
                id="carousel-example"
                aria-label="Пример карусели с доступностью"
                onFocus={() => setAriaLive('polite')}
                onBlur={() => setAriaLive('off')}
                onMouseOver={() => setAriaLive('polite')}
                onMouseLeave={() => setAriaLive('off')}
            >
                <StyledControls>
                    <Button
                        contentLeft={<IconChevronLeft size="s" color="#fff" />}
                        onClick={() => setIndex((i) => (i > 0 ? i - 1 : items.length - 1))}
                        aria-controls="carousel-example"
                        aria-label="Предыдущий слайд"
                        view="clear"
                    />
                    <Button
                        contentLeft={<IconChevronRight size="s" color="#fff" />}
                        onClick={() => setIndex((i) => (i < items.length - 1 ? i + 1 : 0))}
                        aria-controls="carousel-example"
                        aria-label="Следующий слайд"
                        view="clear"
                    />
                </StyledControls>
                <StyledCarousel index={index} scrollSnapType="none" ariaLive={ariaLive}>
                    {items.map((item, i) => (
                        <StyledCarouselItem key={`item:${i}`} aria-label={`${i + 1} из ${items.length}`}>
                            <VirtualCarouselCard
                                {...item}
                                href="#"
                                imageBase="img"
                                style={{ display: i === index ? 'block' : 'none' }}
                            />
                        </StyledCarouselItem>
                    ))}
                </StyledCarousel>
                <SmartPaginationDots items={items} index={index} visibleItems={7} onIndexChange={(i) => setIndex(i)} />
            </StyledCarouselWrapper>
        </StyledWrapper>
    );
};
 */
