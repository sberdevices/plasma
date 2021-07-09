import React from 'react';

import { CardProps, Row } from '@sberdevices/plasma-ui';
import { Display3 } from '@sberdevices/plasma-ui';

import { useRemoteHandlers } from '@sberdevices/plasma-ui';
import { CarouselGridWrapper, Carousel, CarouselCol } from '@sberdevices/plasma-ui';

import { Card, CardBody, CardContent, CardMedia } from '@sberdevices/plasma-ui';

export interface ProductCardProps extends CardProps {
    title: string;
    imgSrc: string;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
    const { imgSrc, title, ...rest } = props;

    return (
        <Card {...rest}>
            <CardBody>
                <CardMedia height="8rem" ratio="1/1" src={imgSrc} />
                <CardContent cover>{title}</CardContent>
            </CardBody>
        </Card>
    );
};

export default function CardsPage() {
    const sample = [
        {
            title: 'Hello SberPortal',
            imgSrc: 'http://placekitten.com/256',
        },
        {
            title: 'Hello SberBox',
            imgSrc: 'http://placekitten.com/512',
        },
        {
            title: 'Hello SberTop',
            imgSrc: 'http://placekitten.com/128',
        },
    ];

    const items = Array.from({ length: 10 }, (_, i) => ({ ...sample[i % 3] }));

    const isSberbox = true;
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

    return (
        <>
            <Row>
                <Display3 style={{ margin: '2rem' }}>Hello Carousel</Display3>
            </Row>
            <CarouselGridWrapper>
                <Carousel
                    as={Row}
                    axis="x"
                    index={index}
                    animatedScrollByIndex={isSberbox}
                    style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
                >
                    {items.map(({ title, imgSrc }, i) => (
                        <CarouselCol key={`item:${i}`} size={3} sizeXL={4}>
                            <ProductCard title={title} focused={i === index} imgSrc={imgSrc} />
                        </CarouselCol>
                    ))}
                </Carousel>
            </CarouselGridWrapper>
        </>
    );
}
