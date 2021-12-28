import {
    CarouselGridWrapper,
    Carousel,
    CarouselCol,
    Card,
    CardBody,
    CardMedia,
    CardContent,
    Body1,
    Footnote1,
    useRemoteHandlers,
} from '@sberdevices/plasma-ui';
import { isSberBox } from '@sberdevices/plasma-ui/utils';
import styled from 'styled-components';

const StyledCarousel = styled(Carousel)`
    padding: var(--plasma-grid-margin) 0;
`;

const basePath = process.env.BASE_PATH || '';
const items = [
    { title: 'Каждый', subtitle: 'Each', imageSrc: `${basePath}/images/320_320_0.jpg` },
    { title: 'Охотник', subtitle: 'Hunter', imageSrc: `${basePath}/images/320_320_1.jpg` },
    { title: 'Желает', subtitle: 'Whants', imageSrc: `${basePath}/images/320_320_2.jpg` },
    { title: 'Знать', subtitle: 'To know', imageSrc: `${basePath}/images/320_320_3.jpg` },
    { title: 'Где', subtitle: 'Where', imageSrc: `${basePath}/images/320_320_4.jpg` },
    { title: 'Сидит', subtitle: 'Is', imageSrc: `${basePath}/images/320_320_5.jpg` },
    { title: 'Фазан', subtitle: 'The pheasant', imageSrc: `${basePath}/images/320_320_6.jpg` },
];

const isSberbox = isSberBox();
const delay = isSberbox ? 300 : 30;
const longDelay = isSberbox ? 1500 : 150;

export default function CarouselPage() {
    const [index] = useRemoteHandlers({
        initialIndex: 0,
        axis: 'x',
        delay,
        longDelay,
        min: 0,
        max: items.length - 1,
    });

    return (
        <CarouselGridWrapper>
            <StyledCarousel index={index} axis="x" animatedScrollByIndex={isSberbox}>
                {items.map((item, i) => (
                    <CarouselCol
                        key={i}
                        size={2}
                        sizeXL={4}
                        aria-label={`${i + 1} из ${items.length}`}
                        tabIndex={i === index ? 0 : -1}
                    >
                        <Card outlined scaleOnFocus focused={i === index}>
                            <CardBody>
                                <CardMedia src={item.imageSrc} alt={item.subtitle} width={320} height={320} />
                                <CardContent cover>
                                    <Body1>{item.title}</Body1>
                                    <Footnote1>{item.subtitle}</Footnote1>
                                </CardContent>
                            </CardBody>
                        </Card>
                    </CarouselCol>
                ))}
            </StyledCarousel>
        </CarouselGridWrapper>
    );
}

export function getStaticProps() {
    return {
        props: {
            title: 'Carousel',
            back: true,
        },
    };
}
