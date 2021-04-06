import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardMedia, CardContent, CardParagraph1 } from '@sberdevices/plasma-ui/components/Card';
import { Ratio } from '@sberdevices/plasma-ui/components/Image';
import { TextBox, TextBoxBigTitle, TextBoxSubTitle } from '@sberdevices/plasma-ui/components/TextBox';
import { Button } from '@sberdevices/plasma-ui/components/Button';

import { ShowcaseDashedBorder, ShowcaseSectionName, ShowcasePanel } from '../../../helpers';

const Row = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin-bottom: 2.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const StyledCard = styled(Card)`
    margin-right: 2.5rem;

    &:last-child {
        margin-right: 0;
    }
`;

function CardItem({
    image,
    ratio,
    customRatio,
    title,
    subtitle,
    description,
    url,
    button,
}: {
    image: string;
    ratio?: Ratio;
    customRatio?: string;
    title: string;
    subtitle: string;
    description: string;
    url: string;
    button?: string;
}) {
    return (
        <StyledCard style={{ width: '640px' }} tabIndex={-1} outlined scaleOnFocus>
            <CardBody>
                <CardMedia src={image} ratio={ratio} customRatio={customRatio} />
                <CardContent cover>
                    <TextBox>
                        <TextBoxBigTitle>{title}</TextBoxBigTitle>
                        <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                        <CardParagraph1 style={{ marginTop: '0.75rem' }} lines={3}>
                            {description}
                        </CardParagraph1>
                        <TextBoxSubTitle>{url}</TextBoxSubTitle>
                    </TextBox>
                    {button && (
                        <Button style={{ marginTop: '2.5rem' }} view="secondary">
                            {button}
                        </Button>
                    )}
                </CardContent>
            </CardBody>
        </StyledCard>
    );
}

function BasicCards() {
    return (
        <ShowcaseDashedBorder>
            <Row>
                <CardItem
                    image="./images/180_320_9.jpg"
                    ratio="9 / 16"
                    title="Дэвид Боуи"
                    subtitle="Рок-певец"
                    description="Британский рок-певец и автор песен, а также продюсер, звукорежиссёр, художник и актёр. На протяжении ..."
                    url="ru.wikipedia.org"
                    button="Button"
                />
                <CardItem
                    image="./images/180_320_9.jpg"
                    customRatio="190.77778"
                    title="Дэвид Боуи"
                    subtitle="Рок-певец"
                    description="Британский рок-певец и автор песен, а также продюсер, звукорежиссёр, художник и актёр. На протяжении ..."
                    url="ru.wikipedia.org"
                    button="Button"
                />
                <CardItem
                    image="./images/180_320_9.jpg"
                    ratio="1 / 1"
                    title="Дэвид Боуи"
                    subtitle="Рок-певец"
                    description="Британский рок-певец и автор песен, а также продюсер, звукорежиссёр, художник и актёр. На протяжении ..."
                    url="ru.wikipedia.org"
                    button="Button"
                />
            </Row>
            <Row>
                <CardItem
                    image="./images/180_320_9.jpg"
                    ratio="9 / 16"
                    title="Дэвид Боуи"
                    subtitle="Рок-певец"
                    description="Британский рок-певец и автор песен, а также продюсер, звукорежиссёр, художник и актёр. На протяжении ..."
                    url="ru.wikipedia.org"
                />
                <CardItem
                    image="./images/180_320_9.jpg"
                    customRatio="167.77778"
                    title="Дэвид Боуи"
                    subtitle="Рок-певец"
                    description="Британский рок-певец и автор песен, а также продюсер, звукорежиссёр, художник и актёр. На протяжении ..."
                    url="ru.wikipedia.org"
                />
                <CardItem
                    image="./images/180_320_9.jpg"
                    ratio="1 / 1"
                    title="Дэвид Боуи"
                    subtitle="Рок-певец"
                    description="Британский рок-певец и автор песен, а также продюсер, звукорежиссёр, художник и актёр. На протяжении ..."
                    url="ru.wikipedia.org"
                />
            </Row>
        </ShowcaseDashedBorder>
    );
}

export function BasicCardShowcase() {
    return (
        <>
            <ShowcaseSectionName title="Basic Card" subTitle="Нижняя шторка" />
            <ShowcasePanel>
                <BasicCards />
            </ShowcasePanel>
        </>
    );
}
