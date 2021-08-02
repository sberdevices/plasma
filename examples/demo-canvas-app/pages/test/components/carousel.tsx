import {
    CarouselGridWrapper,
    Carousel,
    CarouselCol,
    Card,
    CardBody,
    CardMedia,
    CardContent,
    Body1,
    useRemoteHandlers,
} from '@sberdevices/plasma-ui';
import { isSberBox } from '@sberdevices/plasma-ui/utils';
import styled from 'styled-components';

const StyledCarousel = styled(Carousel)`
    padding: var(--plasma-grid-margin) 0;
    margin-left: calc(var(--plasma-grid-gutter) * -1);
    margin-right: calc(var(--plasma-grid-gutter) * -1);
`;

const basePath = process.env.BASE_PATH || '';
const items = [
    { text: 'Each', image: `${basePath}/images/320_320_0.jpg` },
    { text: 'Hunter', image: `${basePath}/images/320_320_1.jpg` },
    { text: 'Wants', image: `${basePath}/images/320_320_2.jpg` },
    { text: 'To know', image: `${basePath}/images/320_320_3.jpg` },
    { text: 'Where', image: `${basePath}/images/320_320_4.jpg` },
    { text: 'Is', image: `${basePath}/images/320_320_5.jpg` },
    { text: 'The peasant', image: `${basePath}/images/320_320_6.jpg` },
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
                    <CarouselCol key={item.text} size={2}>
                        <Card outlined scaleOnFocus focused={i === index}>
                            <CardBody>
                                <CardMedia src={item.image} alt={item.text} width={320} height={320} />
                                <CardContent cover>
                                    <Body1>{item.text}</Body1>
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
