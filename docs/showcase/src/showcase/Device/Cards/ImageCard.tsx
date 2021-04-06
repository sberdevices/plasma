import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardMedia, CardContent } from '@sberdevices/plasma-ui/components/Card';
import { Cell } from '@sberdevices/plasma-ui/components/Cell';
import { Badge } from '@sberdevices/plasma-ui/components/Badge';
import { Ratio } from '@sberdevices/plasma-ui/components/Image';
import { TextBox, TextBoxTitle, TextBoxSubTitle } from '@sberdevices/plasma-ui/components/TextBox';
import { Button } from '@sberdevices/plasma-ui/components/Button';

import { ShowcaseDashedBorder, ShowcaseSectionName, ShowcasePanel, IconPlaceholder } from '../../../helpers';

const Row = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin-bottom: 2.5rem;

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
                            contentLeft={<IconPlaceholder style={{ marginRight: '0.75rem' }} />}
                            content={
                                <TextBox>
                                    <TextBoxTitle>{title}</TextBoxTitle>
                                    <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                                </TextBox>
                            }
                            contentRight={button ? <Button view="primary">{button}</Button> : null}
                        />
                    </CardContent>
                )}
                {tag && (
                    <CardContent cover style={{ background: 'none' }}>
                        <Badge text={tag} size="s" view="secondary" />
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
                    style={{ marginRight: '2.5rem' }}
                />
                <CardItem image="./images/320_320_9.jpg" ratio="1 / 1" style={{ marginRight: '2.5rem' }} />
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
