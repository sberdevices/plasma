import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardContent } from '@sberdevices/plasma-ui/components/Card';
import { TextBox, TextBoxTitle, TextBoxSubTitle } from '@sberdevices/plasma-ui/components/TextBox';
import { Cell } from '@sberdevices/plasma-ui/components/Cell';
import { Icon } from '@sberdevices/plasma-icons';
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

const StretchRow = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    margin-bottom: 2.5rem;
`;

const StyledCard = styled(Card)`
    width: 10rem;
    margin-right: 2.5rem;

    &:last-child {
        margin-right: 0;
    }
`;

function CardItem({ icon, title, subtitle }: { icon?: string; title: string; subtitle: string }) {
    return (
        <StyledCard tabIndex={-1} outlined scaleOnFocus>
            <CardBody>
                <CardContent>
                    <Cell
                        content={
                            <div>
                                {icon && <IconPlaceholder size="l" style={{ marginBottom: '0.5rem' }} />}
                                <TextBox>
                                    <TextBoxTitle>{title}</TextBoxTitle>
                                    <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                                </TextBox>
                            </div>
                        }
                        contentRight={
                            <Button square pin="circle-circle" size="s">
                                <Icon icon="mic" />
                            </Button>
                        }
                        alignRight="top"
                    />
                </CardContent>
            </CardBody>
        </StyledCard>
    );
}

function CardsShowcase({ style }: { style?: React.CSSProperties }) {
    return (
        <ShowcaseDashedBorder style={style}>
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
                subTitle="Простая карточка с текстовым блоком и опциональной иконкой. Могут иметь произвольный размер."
            />
            <ShowcasePanel>
                <CardsShowcase style={{ marginRight: '2.5rem' }} />
                <CardsShowcase />
            </ShowcasePanel>
        </>
    );
}
