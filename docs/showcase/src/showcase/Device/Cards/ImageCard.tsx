import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardMedia, CardContent } from '@sberdevices/ui/components/Card';
import { Cell } from '@sberdevices/ui/components/Cell';
import { Badge } from '@sberdevices/ui/components/Badge';
import { Ratio } from '@sberdevices/ui/components/Image';
import { TextBox, TextBoxTitle, TextBoxSubTitle } from '@sberdevices/ui/components/TextBox';
import { Button } from '@sberdevices/ui/components/Button';

import { ShowcaseDashedBorder, ShowcaseSectionName, ShowcasePanel, IconPlaceholder } from '../../../helpers';

const Row = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin-bottom: 40px;

    &:last-child {
        margin-bottom: 0;
    }
`;

function CardItem({
    image,
    ratio,
    customRatio,
    title,
    subtitle,
    button,
    tag,
    style,
}: {
    image: string;
    ratio?: Ratio;
    customRatio?: string;
    title?: string;
    subtitle?: string;
    button?: string;
    tag?: string;
    style?: React.CSSProperties;
}) {
    const cardContentVisible = title && subtitle;
    return (
        <Card style={{ width: '640px', ...style }} tabIndex={-1} outlined scaleOnFocus>
            <CardBody>
                <CardMedia src={image} ratio={ratio} customRatio={customRatio} />
                {cardContentVisible && (
                    <CardContent cover>
                        <Cell
                            left={<IconPlaceholder style={{ marginRight: '24px' }} />}
                            content={
                                <TextBox>
                                    <TextBoxTitle>{title}</TextBoxTitle>
                                    <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                                </TextBox>
                            }
                            right={button ? <Button view="primary">{button}</Button> : null}
                        />
                    </CardContent>
                )}
                {tag && (
                    <CardContent cover style={{ background: 'none' }}>
                        <Badge text={tag} size="s" view="overlay" />
                    </CardContent>
                )}
            </CardBody>
        </Card>
    );
}

function ImageCards() {
    return (
        <ShowcaseDashedBorder>
            <Row>
                <CardItem
                    image="./images/320_320_9.jpg"
                    ratio="1 / 1"
                    title="Title"
                    subtitle="Subtitle"
                    button="Label"
                    style={{ marginRight: '40px' }}
                />
                <CardItem image="./images/320_320_9.jpg" ratio="1 / 1" style={{ marginRight: '40px' }} />
                <CardItem image="./images/320_320_9.jpg" ratio="1 / 1" tag="tag" />
            </Row>
        </ShowcaseDashedBorder>
    );
}

export function ImageCardShowcase() {
    return (
        <>
            <ShowcaseSectionName title="Image Card" subTitle="Карточка с основным блоком картинкой" />
            <ShowcasePanel>
                <ImageCards />
            </ShowcasePanel>
        </>
    );
}
