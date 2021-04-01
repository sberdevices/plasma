import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardMedia, CardContent } from '@sberdevices/ui/components/Card';
import { Ratio } from '@sberdevices/ui/components/Image';
import { TextBox, TextBoxBigTitle, TextBoxSubTitle } from '@sberdevices/ui/components/TextBox';

import { ShowcaseDashedBorder, ShowcaseSectionName, ShowcasePanel } from '../../../helpers';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const StyledCard = styled(Card)`
    margin-right: 40px;
`;

function CardItem({
    image,
    ratio,
    customRatio,
    title,
    subtitle,
}: {
    image: string;
    ratio?: Ratio;
    customRatio?: string;
    title: string;
    subtitle: string;
}) {
    return (
        <StyledCard outlined scaleOnFocus>
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
                <CardItem image="./images/180_320_9.jpg" ratio="9 / 16" title="Title" subtitle="Subtitle" />
                <CardItem image="./images/320_320_1.jpg" ratio="1 / 1" title="Title" subtitle="Subtitle" />
                <CardItem image="./images/180_320_9.jpg" ratio="16 / 9" title="Title" subtitle="Subtitle" />
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
