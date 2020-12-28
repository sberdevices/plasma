import React from 'react';
import styled, { css } from 'styled-components';
import { boolean, number, select } from '@storybook/addon-knobs';
import { whitePrimary, whiteSecondary, whiteTertiary } from '@sberdevices/plasma-tokens';

import { GridLines } from '../../helpers/GridLines';
import { Filler } from '../../helpers/Filler';
import { applyMaxLines, MaxLinesProps } from '../../mixins';
import { Button } from '../Button';
import { Card, CardBody, CardMedia, CardContent } from '../Card';
import { Container, Row } from '../Grid';
import { Body1, Body3, Footnote1 } from '../Typography';

import { ScalingColCard, scaleCallback, scaleResetCallback } from './Carousel.examples';
import type { SnapType, SnapAlign } from './Carousel.types';

import { CarouselWrapper, Carousel, CarouselItem, CarouselCol } from '.';

const itemSize = '20vw';
const items = Array(240).fill({
    title: 'Untitled track',
    descr: 'Unnamed artist',
    image: '/images/card1.png',
});

const snapTypes = ['mandatory', 'proximity'] as SnapType[];
const snapAlign = ['start', 'center', 'end'] as SnapAlign[];

const StyledControls: React.FC<{ onPrev: Function; onNext: Function }> = ({ onPrev, onNext }) => (
    <div style={{ position: 'fixed', top: 5, left: 0, right: 0, zIndex: 1, justifyContent: 'center', display: 'flex' }}>
        <Button text="<" size="s" onClick={onPrev} />
        <Button text=">" size="s" onClick={onNext} />
    </div>
);

const StyledSquareFiller = styled(Filler)`
    width: ${itemSize};
    height: ${itemSize};
`;

const SpacedCarousel = styled(Carousel)`
    padding-top: 10rem;
    padding-bottom: 5rem;
`;

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
    const [index, setIndex] = React.useState(number('index', 0));
    const style = React.useMemo(
        () => ({
            paddingTop: axis === 'x' ? '3rem' : 0,
            paddingBottom: axis === 'x' ? '3rem' : 0,
            width: axis === 'x' ? '100%' : itemSize,
            height: axis === 'y' ? '100vh' : itemSize,
        }),
        [axis],
    );

    return (
        <>
            <StyledControls
                onPrev={() => setIndex(Math.max(index - 1, 0))}
                onNext={() => setIndex(Math.min(index + 1, items.length - 1))}
            />
            <CarouselWrapper>
                <Carousel axis={axis} index={index} style={style}>
                    {items.map((_, i) => (
                        <CarouselItem key={`item:${i}`}>
                            <StyledSquareFiller bordered fullHeight view={i === index ? 'primary' : 'secondary'}>
                                Item {i}
                            </StyledSquareFiller>
                        </CarouselItem>
                    ))}
                </Carousel>
            </CarouselWrapper>
        </>
    );
};

export const WithGrid = () => {
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
                    scrollSnap={boolean('scrollSnap', false)}
                    scrollSnapType={select('scrollSnapType', snapTypes, 'mandatory')}
                >
                    {children}
                </Carousel>
            </Row>
        </CarouselWrapper>
    </StyledSection>
);

export const MusicPage: React.FC = () => {
    const scrollSnapAlign = select('scrollSnapAlign', snapAlign, 'start');
    return (
        <>
            {boolean('Display grid', true) && <GridLines />}
            <Container>
                <CarouselSection heading="Новые альбомы">
                    {items.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={2} sizeM={1.5} scrollSnapAlign={scrollSnapAlign}>
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
                <CarouselSection heading="Хиты и чарты">
                    {items.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={4} sizeM={3} scrollSnapAlign={scrollSnapAlign}>
                            <Card roundness={12}>
                                <CardBody>
                                    <CardMedia src={item.image} ratio="9:16" />
                                </CardBody>
                            </Card>
                            <StyledItemTitle>{item.title}</StyledItemTitle>
                            <StyledItemDescr maxLines={2}>{item.descr}</StyledItemDescr>
                            <StyledItemNote>{item.descr}</StyledItemNote>
                        </CarouselCol>
                    ))}
                </CarouselSection>
                <CarouselSection heading="Лучшее за 2020">
                    {items.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={2} sizeM={1.5} scrollSnapAlign={scrollSnapAlign}>
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
                <CarouselSection heading="Топ артисты">
                    {items.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={2} sizeM={1.5} scrollSnapAlign={scrollSnapAlign}>
                            <Card roundness={250}>
                                <CardBody>
                                    <CardMedia src={item.image} ratio="1:1" />
                                </CardBody>
                            </Card>
                            <StyledItemTitle textAlign="center">{item.title}</StyledItemTitle>
                        </CarouselCol>
                    ))}
                </CarouselSection>
                <CarouselSection heading="Жанры и настроения">
                    {items.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={3} sizeM={2} scrollSnapAlign={scrollSnapAlign}>
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
                    {items.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={2} sizeM={1.5} scrollSnapAlign={scrollSnapAlign}>
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
                    {items.map((item, i) => (
                        <CarouselCol key={`item:${i}`} size={4} sizeM={3} scrollSnapAlign={scrollSnapAlign}>
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

export const CenterItem: React.FC = () => {
    const [index, setIndex] = React.useState(number('index', 0));
    const scaleCentral = boolean('scaleCentral', true);
    const detectCentral = boolean('detectCentral', true);
    const detectThreshold = number('detectThreshold', 0.5);
    const scrollSnap = boolean('scrollSnap', true);
    const scrollSnapType = select('scrollSnapType', snapTypes, 'mandatory');

    return (
        <>
            {boolean('Display grid', true) && <GridLines />}
            <StyledControls
                onPrev={() => setIndex(Math.max(index - 1, 0))}
                onNext={() => setIndex(Math.min(index + 1, items.length - 1))}
            />
            <Container>
                <CarouselWrapper inContainer>
                    <Row>
                        <SpacedCarousel
                            axis="x"
                            index={index}
                            scrollSnap={scrollSnap}
                            scrollSnapType={scrollSnapType}
                            detectCentral={detectCentral}
                            detectThreshold={detectThreshold}
                            scaleCentral={scaleCentral}
                            scaleCallback={scaleCallback}
                            scaleResetCallback={scaleResetCallback}
                            onCentralChange={(i) => setIndex(i)}
                            overscrollLeft="50%"
                            overscrollRight="50%"
                        >
                            {items.map((item, i) => (
                                <ScalingColCard
                                    key={`item:${i}`}
                                    isActive={i === index}
                                    item={{ ...item, title: `${item.title} #${i}` }}
                                />
                            ))}
                        </SpacedCarousel>
                    </Row>
                </CarouselWrapper>
            </Container>
        </>
    );
};
