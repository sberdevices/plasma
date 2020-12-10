import React from 'react';
import styled, { css } from 'styled-components';
import { boolean, number, select } from '@storybook/addon-knobs';
import { whitePrimary, whiteSecondary, whiteTertiary } from '@sberdevices/plasma-tokens';

import { GridLines } from '../../helpers/GridLines';
import { Filler } from '../../helpers/Filler';
import { Outline } from '../../helpers/Outline';
import { applyMaxLines, MaxLinesProps } from '../../mixins';
import { Card, CardBody, CardMedia, CardContent } from '../Card';
import { Container, Row } from '../Grid';
import { Body1, Body3, Footnote1 } from '../Typography';

import { SnapType, SnapAlign } from './Carousel';

import { CarouselWrapper, Carousel, CarouselItem, CarouselCol } from '.';

const StyledSquareFiller = styled(Filler)`
    width: 200px;
    height: 200px;
`;

export default {
    title: 'Carousel',
    decorators: [
        (Story) => (
            <div style={{ margin: '-16px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Basic = () => {
    const axis = select('axis', ['x', 'y'], 'x');
    const items = Array(number('Items', 20)).fill(0);
    const index = number('index', 0);
    return (
        <Outline style={{ width: axis === 'x' ? '100%' : 200, height: axis === 'y' ? '100vh' : 200 }}>
            <Carousel axis={axis} index={index}>
                {items.map((_, i) => (
                    <CarouselItem key={`item:${i}`}>
                        <StyledSquareFiller bordered fullHeight view={i === index ? 'primary' : 'secondary'}>
                            Item {i}
                        </StyledSquareFiller>
                    </CarouselItem>
                ))}
            </Carousel>
        </Outline>
    );
};

export const WithGrid = () => {
    const items = Array(number('Items', 20)).fill(0);
    const index = number('index', 0);
    return (
        <>
            {boolean('Display grid', true) && <GridLines />}
            <Container>
                <CarouselWrapper>
                    <Row>
                        <Carousel axis="x" index={index}>
                            {items.map((_, i) => (
                                <CarouselCol key={`item:${i}`} size={number('size', 2)}>
                                    <Filler view={i === index ? 'primary' : 'secondary'}>Item {i}</Filler>
                                </CarouselCol>
                            ))}
                        </Carousel>
                    </Row>
                </CarouselWrapper>
            </Container>
        </>
    );
};

const songs = Array(12).fill({
    title: 'Songs And Instrumentals',
    artist: 'Haus Arafna',
    image: '/images/card1.png',
});

const hitsAndCharts = Array(12).fill({
    title: 'Топ шазама',
    descr: 'Самые зашазамленные треки этой недели',
    note: '104 песни, 5 часов 24 минуты',
    image: '/images/card1.png',
});

const genres = Array(12).fill({
    title: 'Саундтреки',
    image: '/images/card1.png',
});

const artists = Array(12).fill({
    artist: 'Foo Fighters',
    image: '/images/card1.png',
});

const podcasts = Array(12).fill({
    title: 'Pointcast (Поинткаст)',
    descr: 'Обновлён 29.04',
    image: '/images/card1.png',
});

const newPodcasts = Array(12).fill({
    title: 'Лётчицы',
    descr: 'История женской авиации в Великой Отечественной войне бла бла бла бла бла бла бла бла бла бла бла бла',
    image: '/images/card1.png',
});

const StyledSection = styled.section`
    margin-bottom: 1.75rem;

    &:first-child {
        margin-top: 1.75rem;
    }
`;

const StyledSectionHeading = styled(Body3)`
    margin-bottom: 1rem;
`;

const StyledItemTitle = styled(Body1)<{ textAlign?: string }>`
    margin-top: 0.75rem;
    color: ${whitePrimary};

    ${({ textAlign }) =>
        textAlign &&
        css`
            text-align: ${textAlign};
        `}
`;

const StyledItemDescr = styled(Footnote1)<MaxLinesProps>`
    ${applyMaxLines}

    margin-top: 0.25rem;
    color: ${whiteSecondary};
`;

const StyledItemNote = styled(Footnote1)`
    margin-top: 0.25rem;
    color: ${whiteTertiary};
`;

const snapTypes = ['mandatory', 'proximity'] as SnapType[];
const snapAlign = ['start', 'center', 'end'] as SnapAlign[];

interface CarouselSectionProps {
    heading: string;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ heading, children }) => (
    <StyledSection>
        <StyledSectionHeading>{heading}</StyledSectionHeading>
        <CarouselWrapper inContainer>
            <Row>
                <Carousel
                    axis="x"
                    index={0}
                    scrollSnap={boolean('scrollSnap', true)}
                    scrollSnapType={select('scrollSnapType', snapTypes, 'mandatory')}
                    scrollSnapAlign={select('scrollSnapAlign', snapAlign, 'start')}
                >
                    {children}
                </Carousel>
            </Row>
        </CarouselWrapper>
    </StyledSection>
);

export const MusicPage: React.FC = () => {
    return (
        <>
            {boolean('Display grid', true) && <GridLines />}
            <Container>
                <CarouselSection heading="Новые альбомы">
                    {songs.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={2} sizeM={1.5}>
                            <Card roundness={12}>
                                <CardBody>
                                    <CardMedia src={item.image} ratio="1:1" />
                                </CardBody>
                            </Card>
                            <StyledItemTitle>{item.title}</StyledItemTitle>
                            <StyledItemDescr>{item.artist}</StyledItemDescr>
                        </CarouselCol>
                    ))}
                </CarouselSection>
                <CarouselSection heading="Хиты и чарты">
                    {hitsAndCharts.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={4} sizeM={3}>
                            <Card roundness={12}>
                                <CardBody>
                                    <CardMedia src={item.image} ratio="9:16" />
                                </CardBody>
                            </Card>
                            <StyledItemTitle>{item.title}</StyledItemTitle>
                            <StyledItemDescr maxLines={2}>{item.descr}</StyledItemDescr>
                            <StyledItemNote>{item.note}</StyledItemNote>
                        </CarouselCol>
                    ))}
                </CarouselSection>
                <CarouselSection heading="Лучшее за 2020">
                    {songs.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={2} sizeM={1.5}>
                            <Card roundness={12}>
                                <CardBody>
                                    <CardMedia src={item.image} ratio="1:1" />
                                </CardBody>
                            </Card>
                            <StyledItemTitle>{item.title}</StyledItemTitle>
                            <StyledItemDescr>{item.artist}</StyledItemDescr>
                        </CarouselCol>
                    ))}
                </CarouselSection>
                <CarouselSection heading="Топ артисты">
                    {artists.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={2} sizeM={1.5}>
                            <Card roundness={250}>
                                <CardBody>
                                    <CardMedia src={item.image} ratio="1:1" />
                                </CardBody>
                            </Card>
                            <StyledItemTitle textAlign="center">{item.artist}</StyledItemTitle>
                        </CarouselCol>
                    ))}
                </CarouselSection>
                <CarouselSection heading="Жанры и настроения">
                    {genres.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={3} sizeM={2}>
                            <Card roundness={12}>
                                <CardBody>
                                    <CardMedia src={item.image} ratio="9:16" />
                                    <CardContent cover>
                                        <StyledItemTitle>{item.title}</StyledItemTitle>
                                    </CardContent>
                                </CardBody>
                            </Card>
                        </CarouselCol>
                    ))}
                </CarouselSection>
                <CarouselSection heading="Подкасты">
                    {podcasts.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={2} sizeM={1.5}>
                            <Card roundness={12}>
                                <CardBody>
                                    <CardMedia src={item.image} ratio="1:1" />
                                </CardBody>
                            </Card>
                            <StyledItemTitle>{item.title}</StyledItemTitle>
                            <StyledItemDescr>{item.descr}</StyledItemDescr>
                        </CarouselCol>
                    ))}
                </CarouselSection>
                <CarouselSection heading="Новое в подкастах">
                    {newPodcasts.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={4} sizeM={3}>
                            <Card roundness={12}>
                                <CardBody>
                                    <CardMedia src={item.image} customRatio="55.7575" />
                                </CardBody>
                            </Card>
                            <StyledItemTitle>{item.title}</StyledItemTitle>
                            <StyledItemDescr maxLines={2}>{item.descr}</StyledItemDescr>
                        </CarouselCol>
                    ))}
                </CarouselSection>
            </Container>
        </>
    );
};
