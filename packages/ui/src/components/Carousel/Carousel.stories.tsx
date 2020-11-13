import React from 'react';
import { number } from '@storybook/addon-knobs';

import { Filler } from '../../helpers/Filler';
import { Outline } from '../../helpers/Outline';
import { ImagePlaceholder } from '../../helpers/ImagePlaceholder';
import { ActionButton } from '../Button/ActionButton';
import { Card, CardBody, CardMedia, CardContent, CardHeadline1, CardHeadline3, CardFootnote1 } from '../Card';
import { Container, Row, Col } from '../Grid/Grid';
import { Headline3 } from '../Typography/Headline';

import { CarouselWrapper } from './CarouselWrapper';
import { Carousel } from './Carousel';
import { CarouselItem } from './CarouselItem';
import { CarouselGridCol } from './CarouselGridCol';

export default {
    title: 'Carousel',
    decorators: [
        (Story) => (
            <div style={{ padding: '1.5rem 0' }}>
                <Story />
            </div>
        ),
    ],
};

export const Basic = () => {
    const items = Array(number('Items', 20)).fill(0);
    const index = number('index', 10);
    return (
        <Outline>
            <Carousel axis="x" index={index}>
                {items.map((_, i) => (
                    <CarouselItem key={`item:${i}`} style={{ width: 100, height: 200 }}>
                        <Filler bordered fullHeight view={i === index ? 'primary' : 'secondary'}>
                            Item {i}
                        </Filler>
                    </CarouselItem>
                ))}
            </Carousel>
        </Outline>
    );
};

export const WithGrid = () => {
    const items = Array(number('Items', 10)).fill(0);
    const index = number('index', 5);
    return (
        <Outline>
            <Container>
                <Outline>
                    <CarouselWrapper>
                        <Row>
                            <Carousel axis="x" index={index}>
                                {items.map((_, i) => (
                                    <CarouselGridCol key={`item:${i}`} size={3}>
                                        <Filler view={i === index ? 'primary' : 'secondary'}>Item {i}</Filler>
                                    </CarouselGridCol>
                                ))}
                            </Carousel>
                        </Row>
                    </CarouselWrapper>
                </Outline>
            </Container>
        </Outline>
    );
};

export const MarketPage = () => {
    const genres = ['Action', 'Racing', 'RPG', 'Strategy', 'MOBA', 'Arcade', 'Single', 'Multiplayer'];
    const items = Array(number('Items', 10)).fill(0);

    // Storybook knob здесь не подходит, потому что полностью перерисовывает сторис,
    // так что будем менять индекс с помощью кнопок и useState
    const [index, setIndex] = React.useState(0);
    const handlePrev = () => setIndex(Math.max(index - 1, 0));
    const handleNext = () => setIndex(Math.min(index + 1, items.length - 1));

    return (
        <Container>
            {/** Карусель */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Headline3>Popular games</Headline3>
                <div style={{ display: 'flex' }}>
                    <ActionButton style={{ marginRight: 10 }} onClick={handlePrev}>
                        &lt;
                    </ActionButton>
                    <ActionButton onClick={handleNext}>&gt;</ActionButton>
                </div>
            </div>
            {/** Модификатор для компенсирования отступа Container */}
            <CarouselWrapper inContainer>
                <Row>
                    {/** На карусели задаем отступы для фокусной рамки Card */}
                    <Carousel axis="x" index={index} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                        {items.map((_, i) => (
                            <CarouselGridCol key={`item:${i}`} size={3}>
                                {/** Произвольный контент */}
                                <Card highlightOnFocus focused={i === index}>
                                    <CardBody>
                                        <CardMedia src="" height="12rem">
                                            <ImagePlaceholder color="white" width="100%" height="12rem" rotation={29} />
                                        </CardMedia>
                                        <CardContent>
                                            <CardHeadline3>Bestseller</CardHeadline3>
                                            <CardHeadline1 style={{ marginTop: '0.75rem' }}>Game {i}</CardHeadline1>
                                            <CardFootnote1 style={{ marginTop: '0.375rem' }} view="secondary">
                                                Popular Game Studios
                                            </CardFootnote1>
                                        </CardContent>
                                    </CardBody>
                                </Card>
                            </CarouselGridCol>
                        ))}
                    </Carousel>
                </Row>
            </CarouselWrapper>

            {/** Остальной контент */}
            <Headline3 style={{ marginBottom: '1rem' }}>Genres</Headline3>
            <Row>
                {genres.map((name, i) => (
                    <Col key={`item::${i}`} size={3}>
                        <Card style={{ marginBottom: '1rem' }}>
                            <CardBody>
                                <CardContent>
                                    <CardHeadline3>{name}</CardHeadline3>
                                </CardContent>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
