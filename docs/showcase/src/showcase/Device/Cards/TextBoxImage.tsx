import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardMedia, CardContent } from '@sberdevices/plasma-ui/components/Card';
import { Ratio } from '@sberdevices/plasma-ui/components/Image';
import { TextBox, TextBoxBigTitle, TextBoxSubTitle } from '@sberdevices/plasma-ui/components/TextBox';

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

function CardItem({
    image,
    ratio,
    customRatio,
    title,
    subtitle,
    style,
}: {
    image: string;
    ratio?: Ratio;
    customRatio?: string;
    title: string;
    subtitle: string;
    style?: React.CSSProperties;
}) {
    return (
        <StyledCard style={style} tabIndex={-1} outlined scaleOnFocus>
            <CardBody>
                <CardMedia src={image} placeholder={image} ratio={ratio} customRatio={customRatio} />
                <CardContent>
                    <TextBox>
                        <TextBoxBigTitle>{title}</TextBoxBigTitle>
                        <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                    </TextBox>
                </CardContent>
            </CardBody>
        </StyledCard>
    );
}

function TextBoxImageCards() {
    return (
        <ShowcaseDashedBorder>
            <Container>
                <CardItem
                    style={{ width: '320px' }}
                    image="./images/180_320_9.jpg"
                    ratio="9 / 16"
                    title="Title"
                    subtitle="Subtitle"
                />
                <CardItem
                    style={{ width: '320px' }}
                    image="./images/320_320_1.jpg"
                    ratio="1 / 1"
                    title="Title"
                    subtitle="Subtitle"
                />
                <CardItem
                    style={{ width: '500px' }}
                    image="./images/180_320_9.jpg"
                    ratio="16 / 9"
                    title="Title"
                    subtitle="Subtitle"
                />
            </Container>
        </ShowcaseDashedBorder>
    );
}

export function TextBoxImageCardShowcase() {
    return (
        <>
            <ShowcaseSectionName
                title="TextBox"
                subTitle="Простая карточка с текстовым блоком и опциональной иконкой. Могут иметь произвольный размер."
            />
            <ShowcasePanel>
                <TextBoxImageCards />
            </ShowcasePanel>
        </>
    );
}
