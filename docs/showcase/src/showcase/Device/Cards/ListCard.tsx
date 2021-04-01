import React from 'react';
import styled from 'styled-components';
import { Card, CardContent } from '@sberdevices/ui/components/Card';
import { TextBox, TextBoxTitle, TextBoxBigTitle, TextBoxSubTitle } from '@sberdevices/ui/components/TextBox';
import { Button } from '@sberdevices/ui/components/Button';
import { Cell, CellListItem, CellDisclosure } from '@sberdevices/ui/components/Cell';

import { ShowcaseDashedBorder, ShowcaseSectionName, ShowcasePanel } from '../../../helpers';

const Row = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin-bottom: 40px;
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
        <Card style={{ width: '640px', marginRight: '40px' }} tabIndex={-1} outlined scaleOnFocus>
            <CardContent compact>
                <Cell content={<TextBoxBigTitle>{title}</TextBoxBigTitle>} />
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
                        right={<CellDisclosure />}
                    />
                ))}
                {button && (
                    <Button style={{ margin: '40px 0' }} view="primary">
                        {button}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

function CardItemSingle({ title, subtitle, button }: { title: string; subtitle?: string; button?: string }) {
    return (
        <Card style={{ width: '640px', marginRight: '40px' }} tabIndex={-1} outlined scaleOnFocus>
            <CardContent compact>
                <Cell
                    content={
                        <TextBox>
                            <TextBoxTitle>{title}</TextBoxTitle>
                            <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                        </TextBox>
                    }
                    right={<CellDisclosure />}
                />
                {button && (
                    <Button style={{ margin: '40px 0' }} view="primary">
                        {button}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

function ListCards() {
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
        <ShowcaseDashedBorder>
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
            <ShowcaseSectionName title="Basic Card" subTitle="Нижняя шторка" />
            <ShowcasePanel style={{ flexWrap: 'wrap' }}>
                <ListCards />
                <SingleCards />
            </ShowcasePanel>
        </>
    );
}
