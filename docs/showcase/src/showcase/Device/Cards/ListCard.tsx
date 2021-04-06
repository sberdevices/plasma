import React from 'react';
import styled from 'styled-components';
import { Card, CardContent } from '@sberdevices/plasma-ui/components/Card';
import { TextBox, TextBoxTitle, TextBoxBigTitle, TextBoxSubTitle } from '@sberdevices/plasma-ui/components/TextBox';
import { Button } from '@sberdevices/plasma-ui/components/Button';
import { Cell, CellListItem, CellDisclosure } from '@sberdevices/plasma-ui/components/Cell';

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

function CardItemList({
    items,
    title,
    button,
}: {
    items: Array<{ title: string; subtitle: string }>;
    title?: string;
    button?: string;
}) {
    return (
        <StyledCard style={{ width: '640px' }} tabIndex={-1} outlined scaleOnFocus>
            <CardContent compact>
                {title && <Cell content={<TextBoxBigTitle>{title}</TextBoxBigTitle>} />}
                {items.map((item, i) => (
                    <CellListItem
                        outlined
                        tabIndex={i}
                        key={`item:${i}`}
                        content={
                            <TextBox>
                                <TextBoxTitle>{item.title}</TextBoxTitle>
                                <TextBoxSubTitle>{item.subtitle}</TextBoxSubTitle>
                            </TextBox>
                        }
                        contentRight={<CellDisclosure />}
                    />
                ))}
                {button && (
                    <Button style={{ marginTop: '1.5rem', marginBottom: '0.625rem' }} view="primary">
                        {button}
                    </Button>
                )}
            </CardContent>
        </StyledCard>
    );
}

function CardItemSingle({ title, subtitle, button }: { title: string; subtitle?: string; button?: string }) {
    return (
        <StyledCard style={{ width: '640px' }} tabIndex={-1} outlined scaleOnFocus>
            <CardContent compact>
                <Cell
                    content={
                        <TextBox>
                            <TextBoxTitle>{title}</TextBoxTitle>
                            <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                        </TextBox>
                    }
                    contentRight={<CellDisclosure />}
                />
                {button && (
                    <Button style={{ marginTop: '0.075rem', marginBottom: '0.625rem' }} view="primary">
                        {button}
                    </Button>
                )}
            </CardContent>
        </StyledCard>
    );
}

function ListCards({ style }: { style: React.CSSProperties }) {
    const items = [
        {
            title: 'Title',
            subtitle: 'Subtitle',
        },
        {
            title: 'Title',
            subtitle: 'Subtitle',
        },
        {
            title: 'Title',
            subtitle: 'Subtitle',
        },
    ];
    return (
        <ShowcaseDashedBorder style={style}>
            <Row>
                <CardItemList items={items} />
                <CardItemList items={items} title="Название раздела" />
            </Row>
            <Row>
                <CardItemList items={items} button="Label" />
                <CardItemList items={items} title="Название раздела" button="Label" />
            </Row>
        </ShowcaseDashedBorder>
    );
}

function SingleCards() {
    return (
        <ShowcaseDashedBorder>
            <Row>
                <CardItemSingle title="Title" subtitle="Subtitle" />
                <CardItemSingle title="Title" subtitle="Subtitle" button="Label" />
            </Row>
        </ShowcaseDashedBorder>
    );
}

export function ListCardShowcase() {
    return (
        <>
            <ShowcaseSectionName title="List Card" subTitle="Конструктор карточек списка" />
            <ShowcasePanel style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListCards style={{ marginBottom: '2.5rem' }} />
                <SingleCards />
            </ShowcasePanel>
        </>
    );
}
