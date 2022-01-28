import React from 'react';
import { action } from '@storybook/addon-actions';
import { Card, CardBody, CardMedia, CardContent, CardHeadline1 } from '@sberdevices/plasma-ui';

import { GalleryCardProps } from '../../components/GalleryCard/types';

import { GalleryPage } from './GalleryPage';

export default {
    title: 'Pages/GalleryPage',
};

const imageSrc = 'https://plasma.sberdevices.ru/ui-storybook/images/320_320_0.jpg';

const baseGalleryData = (outerIndex: number) =>
    Array.from({ length: 10 }, (_, i) => ({
        label: `Title ${i + 1}`,
        description: `Decription for Card ${i + 1}`,
        id: Number(`${i}.${outerIndex}`),
        position: i + 1,
        image: {
            src: imageSrc,
        },
        covered: outerIndex % 2 === 1,
    }));

function getGalleryState(count = 1) {
    return {
        activeGalleryIndex: 0,
        gallery:
            count > 1
                ? Array.from({ length: count }, (_, index) => ({
                      items: baseGalleryData(index),
                      id: `Idetifier ${index + 1}`,
                      title: `Carousel ${index + 1}`,
                      activeCardIndex: 0,
                  }))
                : {
                      items: baseGalleryData(0),
                      activeCardIndex: 0,
                  },
    };
}

export const Default = () => (
    <GalleryPage state={getGalleryState()} onCardClick={action('on card click')} changeState={action('change state')} />
);

const CustomCard: React.FC<GalleryCardProps> = ({ card, focused }) => {
    const src = Array.isArray(card.image.src) ? card.image.src[0] : card.image.src;

    return (
        <Card focused={focused} style={{ width: '398px', height: card.covered ? '200px' : '600px' }}>
            <CardBody>
                <CardMedia src={src} ratio={card.covered ? '2 / 1' : '1 / 1'} />
                <CardContent cover={card.covered}>
                    <CardHeadline1>{card.label}</CardHeadline1>
                </CardContent>
            </CardBody>
        </Card>
    );
};

export const WithCustomCard = () => (
    <GalleryPage
        state={getGalleryState(3)}
        onCardClick={action('on card click')}
        changeState={action('change state')}
        galleryCard={CustomCard}
    />
);
