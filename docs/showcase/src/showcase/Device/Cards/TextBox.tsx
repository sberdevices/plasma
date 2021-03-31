import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardMedia, CardContent, CardParagraph1 } from '@sberdevices/ui/components/Card';
import { Cell, CellIcon } from '@sberdevices/ui/components/Cell';
import {
    TextBox,
    TextBoxBigTitle,
    TextBoxBiggerTitle,
    TextBoxTitle,
    TextBoxSubTitle,
} from '@sberdevices/ui/components/TextBox';

import { ShowcaseDashedBorder, ShowcaseSectionName, ShowcasePanel } from '../../../helpers';

const Row = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin-bottom: 40px;
`;

const StretchRow = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    margin-bottom: 40px;
`;

const StyledCard = styled(Card)`
    width: 10rem;
    margin-right: 40px;
`;

function CardItem({ icon, title, subtitle }: { icon?: string; title: string; subtitle: string }) {
    return (
        <StyledCard outlined scaleOnFocus>
            <CardBody>
                <CardContent>
                    {icon && <CellIcon as="img" src={icon} alt="Card Icon" />}
                    <TextBox>
                        <TextBoxBigTitle>{title}</TextBoxBigTitle>
                        <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                    </TextBox>
                </CardContent>
            </CardBody>
        </StyledCard>
    );
}

function CardsShowcase() {
    return (
        <ShowcaseDashedBorder>
            <Row>
                <CardItem icon="./images/320_320_12.jpg" title="Title" subtitle="Subtitle" />
                <CardItem title="Title" subtitle="Subtitle" />
            </Row>
            <StretchRow>
                <CardItem icon="./images/320_320_12.jpg" title="Title" subtitle="Subtitle" />
                <CardItem title="Title" subtitle="Subtitle" />
            </StretchRow>
        </ShowcaseDashedBorder>
    );
}

export function TextBoxCardShowcase() {
    return (
        <>
            <ShowcaseSectionName
                title="TextBox"
                subTitle="Простая карточка с текстовым блоком и опциональной иконкой. Могут иметь произваольный размер."
            />
            <ShowcasePanel>
                <CardsShowcase />
                <CardsShowcase />
            </ShowcasePanel>
        </>
    );
}
