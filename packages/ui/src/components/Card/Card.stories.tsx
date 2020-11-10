import React from 'react';
import { text, number, boolean } from '@storybook/addon-knobs';

import { IconPlaceholder } from '../../helpers/IconPlaceholder';
import { Button } from '../Button/Button';
import { Cell, CellIcon } from '../Cell/Cell';
import { CellListItem } from '../Cell/CellListItem';
import { Disclosure } from '../Cell/CellDisclosure';
import { TextBox, Title, SubTitle, BiggerTitle, BigTitle } from '../TextBox/TextBox';

import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardContent } from './CardContent';
import { CardMedia } from './CardMedia';
import { CardHeadline1, CardHeadline3, CardFootnote1, CardParagraph1 } from './CardTypography';

export default {
    title: 'Card',
};

export const BasicValue = () => {
    const cover = boolean('cover', false);
    return (
        <Card style={{ width: '20rem' }}>
            <CardBody>
                <CardMedia src="./images/card1.png" height={cover ? '20rem' : '12rem'} />
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
                        motion={false}
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
            <CardMedia src="./images/card1.png" height="12rem" />
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
                        <Title>{text('title', 'Title')}</Title>
                        <SubTitle>{text('subtitle', 'Subtitle')}</SubTitle>
                    </TextBox>
                }
                right={<Disclosure />}
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
                    content={<BigTitle>{text('header', 'Название раздела')}</BigTitle>}
                    right={text('details', 'Detail')}
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
                                <Title>{text('title', 'Title')}</Title>
                                <SubTitle>{text('subtitle', 'Subtitle')}</SubTitle>
                            </TextBox>
                        }
                        right={<Disclosure />}
                    />
                ))}
            </CardContent>
        </Card>
    );
};

export const FastAnswer = () => (
    <Card style={{ width: '20rem' }}>
        <CardContent>
            <Cell
                content={<BigTitle style={{ marginTop: 0 }}>{text('header', 'Название раздела')}</BigTitle>}
                right={text('details', 'Detail')}
            />
            <Cell
                left={
                    <CellIcon>
                        <IconPlaceholder size={2.25} />
                    </CellIcon>
                }
                content={<BiggerTitle>{text('value', 'Value')}</BiggerTitle>}
                right={
                    <CellIcon>
                        <IconPlaceholder style={{ marginTop: '0.375rem' }} size={1.5} />
                    </CellIcon>
                }
                alignRight="center"
            />
            <SubTitle>{text('description', 'Description')}</SubTitle>
        </CardContent>
    </Card>
);
