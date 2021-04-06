import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardMedia, CardContent, CardParagraph1 } from '@sberdevices/plasma-ui/components/Card';
import { Badge } from '@sberdevices/plasma-ui/components/Badge';
import { Ratio } from '@sberdevices/plasma-ui/components/Image';
import { Button } from '@sberdevices/plasma-ui/components/Button';
import { TextBox } from '@sberdevices/plasma-ui/components/TextBox';
import { whiteSecondary, accent } from '@sberdevices/plasma-tokens';
import { formatCurrency } from '@sberdevices/plasma-core/utils';
import { Footnote1, Underline, Button1 } from '@sberdevices/plasma-ui/components/Typography';
import { Icon } from '@sberdevices/plasma-icons';
import { Stepper } from '@sberdevices/plasma-ui/components/Stepper';

import { ShowcaseDashedBorder, ShowcaseSectionName, ShowcasePanel } from '../../../helpers';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const StyledCard = styled(Card)`
    margin-right: 2.5rem;

    &:last-child {
        margin-right: 0;
    }
`;

const StyledBadge = styled(Badge)`
    position: absolute;
    z-index: 1000;
    top: 0.25rem;
    right: 0.25rem;
`;

function CardItem({
    image,
    ratio,
    customRatio,
    subtitle,
    style,
    footer,
    plusButton,
}: {
    image: string;
    ratio?: Ratio;
    customRatio?: string;
    subtitle: string;
    style?: React.CSSProperties;
    footer?: React.ReactNode;
    plusButton?: boolean;
}) {
    return (
        <StyledCard style={style} outlined scaleOnFocus>
            <CardBody>
                <StyledBadge circled size="l" text="1" view="secondary" />
                <CardMedia src={image} placeholder={image} ratio={ratio} customRatio={customRatio} />
                <CardContent>
                    {plusButton && (
                        <Button
                            size="s"
                            style={{ position: 'absolute', top: '-1.625rem', right: '0.75rem' }}
                            square
                            pin="circle-circle"
                            view="primary"
                        >
                            <Icon icon="plus" />
                        </Button>
                    )}
                    <TextBox>
                        <CardParagraph1 lines={2}>{subtitle}</CardParagraph1>
                    </TextBox>
                    {footer}
                </CardContent>
            </CardBody>
        </StyledCard>
    );
}

const PriceContainer = styled.div`
    display: flex;
    align-items: baseline;
`;
function Price({
    style,
    price,
    oldPrice,
    quantity,
}: {
    style?: React.CSSProperties;
    price: number;
    oldPrice?: number;
    quantity?: number;
}) {
    const formattedPrice = formatCurrency(price, 'rub', 0);
    const formattedOldPrice = oldPrice && formatCurrency(oldPrice, 'rub', 0);
    return (
        <PriceContainer style={style}>
            <Footnote1>{formattedPrice}</Footnote1>
            {formattedOldPrice && (
                <Footnote1
                    style={{
                        textDecoration: 'line-through',
                        marginLeft: '0.5rem',
                        opacity: '0.4',
                        marginRight: quantity ? '0.25rem' : 0,
                    }}
                >
                    {formattedOldPrice}
                </Footnote1>
            )}
            {quantity && (
                <Footnote1
                    style={{
                        color: accent,
                        marginLeft: '0.25rem',
                    }}
                >
                    x{quantity}
                </Footnote1>
            )}
        </PriceContainer>
    );
}

function Prices() {
    return (
        <ShowcaseDashedBorder>
            <Container>
                <Button1 style={{ marginRight: '1.25rem' }}>{formatCurrency(17200, 'rub', 0)}</Button1>
                <Price price={17200} quantity={2} style={{ marginRight: '1.25rem' }} />
                <Price price={17200} oldPrice={990} style={{ marginRight: '1.25rem' }} />
                <Price price={17200} quantity={2} oldPrice={990} />
            </Container>
        </ShowcaseDashedBorder>
    );
}

function ItemCards({ style }: { style: React.CSSProperties }) {
    const [stepperValue, setStepperValue] = React.useState<number>(2);

    return (
        <ShowcaseDashedBorder style={style}>
            <Container>
                <CardItem
                    style={{ width: '320px' }}
                    image="./images/320_320_1.jpg"
                    ratio="1 / 1"
                    subtitle="Рубашка из органического хлопка"
                    footer={<Price style={{ marginTop: '0.5rem' }} price={17200} oldPrice={990} />}
                />
                <CardItem
                    style={{ width: '320px' }}
                    image="./images/320_320_1.jpg"
                    ratio="1 / 1"
                    subtitle="Рубашка из органического хлопка"
                    footer={
                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
                            <Icon size="xs" color={whiteSecondary} icon="clock" />
                            <Underline style={{ marginLeft: '0.1875rem', color: whiteSecondary }}>20 мин</Underline>
                        </div>
                    }
                />
                <CardItem
                    style={{ width: '320px' }}
                    image="./images/320_320_1.jpg"
                    ratio="1 / 1"
                    subtitle="Рубашка из органического хлопка"
                    footer={
                        <Stepper
                            style={{ width: '100%', marginTop: '1rem' }}
                            pin="square-square"
                            min={0}
                            max={10}
                            value={stepperValue}
                            onChange={setStepperValue}
                        />
                    }
                />
                <CardItem
                    style={{ width: '320px' }}
                    image="./images/320_320_1.jpg"
                    ratio="1 / 1"
                    subtitle="Рубашка из органического хлопка"
                    footer={
                        <Button size="s" style={{ marginTop: '1rem' }}>
                            <Price price={5200} oldPrice={990} />
                        </Button>
                    }
                />
                <CardItem
                    plusButton
                    style={{ width: '320px' }}
                    image="./images/320_320_1.jpg"
                    ratio="1 / 1"
                    subtitle="Молоко ультрапастеризованное"
                    footer={<Price style={{ marginTop: '0.25rem' }} price={79} oldPrice={89} quantity={2} />}
                />
            </Container>
        </ShowcaseDashedBorder>
    );
}
export function ItemCardShowcase() {
    return (
        <>
            <ShowcaseSectionName title="Item Card" subTitle="Карточка предмета, используется для магазинов и заказов" />
            <ShowcasePanel style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <ItemCards style={{ marginBottom: '2.5rem' }} />
                <Prices />
            </ShowcasePanel>
        </>
    );
}
