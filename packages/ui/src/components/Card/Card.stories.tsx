import React from 'react';
import { text, number, boolean } from '@storybook/addon-knobs';

import { IconPlaceholder } from '../../helpers/IconPlaceholder';
import { Button } from '../Button';
import { Cell, CellIcon, CellListItem, CellDisclosure } from '../Cell';
import { TextBox, TextBoxTitle, TextBoxSubTitle, TextBoxBiggerTitle, TextBoxBigTitle } from '../TextBox';

import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardContent } from './CardContent';
import { CardMedia } from './CardMedia';
import { CardHeadline1, CardHeadline3, CardFootnote1, CardParagraph1 } from './CardTypography';

export const BasicValue = () => {
    const cover = boolean('cover', false);
    return (
        <Card
            style={{ width: '20rem' }}
            tabIndex={-1}
            outlined={boolean('outlined', true)}
            scaleOnFocus={boolean('scaleOnFocus', true)}
        >
            <CardBody>
                <CardMedia src="./images/320_320_1.jpg" ratio="9:16" />
                <CardContent cover={cover}>
                    <CardHeadline3>{text('h3', 'Потребительский кредит')}</CardHeadline3>
                    <CardHeadline1 style={{ marginTop: '0.75rem' }}>{text('h1', 'до 230 000 ₽')}</CardHeadline1>
                    <CardFootnote1 style={{ marginTop: '0.375rem' }} view="secondary">
                        {text('footer', 'На 18 месяцев, ставка 13,9%')}
                    </CardFootnote1>
                    <Button
                        text="Label"
                        view="primary"
                        size="s"
                        scaleOnInteraction={false}
                        outlined={false}
                        fullWidth
                        style={{ marginTop: '1em' }}
                        tabIndex={-1}
                    />
                </CardContent>
            </CardBody>
        </Card>
    );
};

export const BasicDefault = () => (
    <Card style={{ width: '20rem' }}>
        <CardBody>
            <CardMedia src="./images/320_320_0.jpg" height="12rem" />
            <CardContent>
                <CardHeadline3>{text('h3', 'Киану Ривз')}</CardHeadline3>
                <CardFootnote1 style={{ marginTop: '0.5rem' }} view="secondary">
                    {text('footer1', 'Актёр')}
                </CardFootnote1>
                <CardParagraph1 style={{ marginTop: '0.75rem' }} lines={4}>
                    Канадский актёр, кинопродюсер, и музыкант. Наиболее известен своими ролями в киносериях «Матрица» и
                    «Джон Уик», а также в фильмах «На гребне волны», «Мой личный штат Айдахо», «Дракула», «Скорость»,
                    «Джонни-мнемоник», «Адвокат дьявола», «Константин: Повелитель тьмы» и «Короли улиц».
                </CardParagraph1>
                <CardFootnote1 style={{ marginTop: '0.5625rem' }} view="tertiary">
                    {text('footer2', 'ru.wikipedia.org')}
                </CardFootnote1>
            </CardContent>
        </CardBody>
    </Card>
);

export const ListCard = () => (
    <Card style={{ width: '20rem' }}>
        <CardContent compact>
            <Cell
                left={
                    <CellIcon>
                        <IconPlaceholder size={2.25} />
                    </CellIcon>
                }
                content={
                    <TextBox>
                        <TextBoxTitle>{text('title', 'Title')}</TextBoxTitle>
                        <TextBoxSubTitle>{text('subtitle', 'Subtitle')}</TextBoxSubTitle>
                    </TextBox>
                }
                right={<CellDisclosure />}
            />
        </CardContent>
    </Card>
);

export const ListAndHeader = () => {
    const items = Array(number('List items', 3)).fill(0);
    return (
        <Card style={{ width: '20rem' }}>
            <CardContent compact>
                <Cell
                    content={<TextBoxBigTitle>{text('header', 'Название раздела')}</TextBoxBigTitle>}
                    right={<span style={{ marginTop: 5 }}>{text('details', 'Detail')}</span>}
                />
                {items.map((_, i) => (
                    <CellListItem
                        key={`item:${i}`}
                        left={
                            <CellIcon>
                                <IconPlaceholder size={2.25} />
                            </CellIcon>
                        }
                        content={
                            <TextBox>
                                <TextBoxTitle>{text('title', 'Title')}</TextBoxTitle>
                                <TextBoxSubTitle>{text('subtitle', 'Subtitle')}</TextBoxSubTitle>
                            </TextBox>
                        }
                        right={<CellDisclosure />}
                    />
                ))}
            </CardContent>
        </Card>
    );
};

export const FastAnswer = () => (
    <Card style={{ width: '20rem' }}>
        <CardContent compact>
            <Cell
                content={<TextBoxBigTitle>{text('header', 'Название раздела')}</TextBoxBigTitle>}
                right={<span style={{ marginTop: 5 }}>{text('details', 'Detail')}</span>}
            />
            <Cell
                left={
                    <CellIcon>
                        <IconPlaceholder size={2.25} />
                    </CellIcon>
                }
                content={<TextBoxBiggerTitle>{text('value', 'Value')}</TextBoxBiggerTitle>}
                right={
                    <CellIcon>
                        <IconPlaceholder style={{ marginTop: '0.375rem' }} size={1.5} />
                    </CellIcon>
                }
                alignRight="center"
            />
            <TextBoxSubTitle>{text('description', 'Description')}</TextBoxSubTitle>
        </CardContent>
    </Card>
);
