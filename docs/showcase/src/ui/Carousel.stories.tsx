import React from 'react';
import styled from 'styled-components';
import {
    Carousel,
    CarouselGridWrapper,
    CarouselItem,
    CarouselItemProps,
    CarouselCol,
    useRemoteHandlers,
} from '@sberdevices/plasma-ui/components/Carousel';
import { Card, CardBody, CardMedia, CardContent } from '@sberdevices/plasma-ui/components/Card';
import { Container, Row } from '@sberdevices/plasma-ui/components/Grid';
import { Headline4 } from '@sberdevices/plasma-ui/components/Typography';
import { isSberBox } from '@sberdevices/plasma-ui/utils/deviceDetection';
import { TextBox, TextBoxBigTitle, TextBoxSubTitle } from '@sberdevices/plasma-ui/components/TextBox';
import type { Ratio } from '@sberdevices/plasma-ui/components/Image';

import { UIStoryDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Carousel',
    component: Carousel,
    decorators: [UIStoryDecorator],
};

const items = Array(25)
    .fill({
        title: 'Заголовок',
        subtitle: 'Описание уравнение времени, сублимиpуя с повеpхности ядpа кометы, вращает реликтовый ледник',
        imageSrc: './images/320_320_n.jpg',
    })
    .map(({ title, subtitle, imageSrc }, i) => ({
        title: `${title} ${i}`,
        subtitle: `${subtitle} ${i}`,
        imageSrc: imageSrc.replace('n', i % 12),
    }));

const StyledHeadline4 = styled(Headline4)`
    margin-top: 2.5rem;
`;
const StyledVerticalCarousel = styled(Row)`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    height: 100vh;
    max-height: 30rem;
    width: 100%;
    max-width: 22.5rem;
    padding: 0.75rem;
`;
const StyledBasicCarousel = styled(Row)`
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
`;

const ItemCard = ({
    title,
    subtitle,
    imageSrc,
    imageRatio,
    ...rest
}: {
    title: string;
    subtitle: string;
    imageSrc: string;
    imageRatio?: Ratio;
    focused: boolean;
}) => (
    <Card {...rest}>
        <CardBody>
            <CardMedia src={imageSrc} ratio={imageRatio} />
            <CardContent cover>
                <TextBox>
                    <TextBoxBigTitle>{title}</TextBoxBigTitle>
                    <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                </TextBox>
            </CardContent>
        </CardBody>
    </Card>
);

const StyledColInner = styled.div`
    transition: transform 0.1s ease 0s;
`;
const StyledItemCard = styled(ItemCard)`
    transition: transform 0.1s ease 0s;
`;

const scaleDelta = 0.37;

/**
 * Функция сброса стилей элементов вне вьюпорта
 */
const scaleResetCallback = (itemEl: HTMLElement) => {
    if (itemEl.children[0]) {
        const inner = itemEl.children[0] as HTMLElement;
        const card = inner.children[0] as HTMLElement;
        inner.style.transform = '';
        card.style.transform = '';
    }
};

/**
 * Функция увеличения центрального элемента
 */
const scaleCallback = (itemEl: HTMLElement, slot: number) => {
    const absSlot = Math.abs(slot);
    const scaleSlot = 1 - absSlot;
    /**
     * Чем ближе к центру - тем больше
     */
    const cardScale = absSlot <= 1 ? 1 + scaleDelta * scaleSlot : 1;
    const cardOffset = ((absSlot <= 1 ? scaleDelta * scaleSlot : 0) * itemEl.offsetHeight) / -3;
    /**
     * Чем дальше от центра - тем больше прозрачности
     */
    const innerOffset = (scaleDelta * Math.min(absSlot, 1) * Math.sign(slot) * itemEl.offsetWidth) / 2;

    if (itemEl.children[0]) {
        const inner = itemEl.children[0] as HTMLDivElement;
        const card = inner.children[0] as HTMLDivElement;
        inner.style.transform = `translate3d(${innerOffset}px,0,0)`;
        card.style.transform = `scale(${cardScale}) translate3d(0,${cardOffset}px,0)`;
    }
};

const ScalingColCard = ({
    isActive,
    scrollSnapAlign,
    item,
}: {
    scrollSnapAlign?: CarouselItemProps['scrollSnapAlign'];
    isActive: boolean;
    item: {
        title: string;
        subtitle: string;
        imageSrc: string;
    };
}) => (
    <CarouselCol size={2} sizeM={1.5} scrollSnapAlign={scrollSnapAlign}>
        <StyledColInner>
            <StyledItemCard
                title={item.title}
                subtitle={item.subtitle}
                focused={isActive}
                imageSrc={item.imageSrc}
                imageRatio="1 / 1"
            />
        </StyledColInner>
    </CarouselCol>
);

const Basic = () => {
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

    return (
        <CarouselGridWrapper>
            <Carousel
                as={StyledBasicCarousel}
                axis={axis}
                index={index}
                animatedScrollByIndex={false}
                scrollAlign="start"
                scrollSnapType="mandatory"
                detectActive
                detectThreshold={0.5}
                onIndexChange={(i) => setIndex(i)}
                paddingStart="50%"
                paddingEnd="50%"
            >
                {items.map(({ title, subtitle }, i) => (
                    <CarouselCol key={`item:${i}`} size={3} sizeXL={4} scrollSnapAlign="start">
                        <ItemCard
                            title={title}
                            subtitle={subtitle}
                            focused={i === index}
                            imageSrc={`./images/320_320_${i % 12}.jpg`}
                        />
                    </CarouselCol>
                ))}
            </Carousel>
        </CarouselGridWrapper>
    );
};

const Vertical = () => {
    const axis = 'y';
    const [index, setIndex] = useRemoteHandlers({
        initialIndex: 0,
        axis,
        delay: 30,
        longDelay: 150,
        min: 0,
        max: items.length - 1,
    });

    return (
        <Carousel
            as={StyledVerticalCarousel}
            axis={axis}
            index={index}
            animatedScrollByIndex={false}
            scrollAlign="start"
            scrollSnapType="mandatory"
            detectActive
            detectThreshold={0.5}
            onIndexChange={(i) => setIndex(i)}
            paddingStart="50%"
            paddingEnd="50%"
        >
            {items.map(({ title, subtitle }, i) => (
                <CarouselItem key={`item:${i}`} scrollSnapAlign="start" style={{ padding: '0.75rem 0' }}>
                    <ItemCard
                        title={title}
                        subtitle={subtitle}
                        focused={i === index}
                        imageSrc={`./images/320_320_${i % 12}.jpg`}
                    />
                </CarouselItem>
            ))}
        </Carousel>
    );
};

const ScaledCentralItem = () => {
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

    return (
        <CarouselGridWrapper>
            <Carousel
                as={StyledBasicCarousel}
                axis="x"
                index={index}
                animatedScrollByIndex={false}
                scrollSnapType="mandatory"
                detectActive
                detectThreshold={0.5}
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
                        scrollSnapAlign="center"
                        isActive={i === index}
                        item={{ ...item, subtitle: '' }}
                    />
                ))}
            </Carousel>
        </CarouselGridWrapper>
    );
};

export const Default = () => (
    <Container>
        <StyledHeadline4>Basic</StyledHeadline4>
        <Basic />
        <StyledHeadline4>Vertical</StyledHeadline4>
        <Vertical />
        <StyledHeadline4>Scaled Central Item</StyledHeadline4>
        <ScaledCentralItem />
    </Container>
);

Default.parameters = {
    chromatic: { pauseAnimationAtEnd: true },
};
