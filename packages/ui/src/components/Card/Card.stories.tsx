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
import { CardParagraph1 } from './CardTypography';

const longText = `Канадский актёр, кинопродюсер, и музыкант. Наиболее известен своими ролями в киносериях «Матрица» и
«Джон Уик», а также в фильмах «На гребне волны», «Мой личный штат Айдахо», «Дракула», «Скорость»,
«Джонни-мнемоник», «Адвокат дьявола», «Константин: Повелитель тьмы» и «Короли улиц».`;

export const BasicValue = () => {
    const cover = boolean('cover', false);

    return (
        <Card
            style={{ width: '22.5rem' }}
            tabIndex={-1}
            outlined={boolean('outlined', true)}
            scaleOnFocus={boolean('scaleOnFocus', true)}
        >
            <CardBody>
                <CardMedia
                    src="./images/320_320_0.jpg"
                    placeholder="./images/320_320_1.jpg"
                    ratio={cover ? '1 / 1' : '16 / 9'}
                />
                <CardContent cover={cover}>
                    <TextBox>
                        <TextBoxBigTitle>{text('subTitle', 'Потребительский кредит')}</TextBoxBigTitle>
                        <TextBoxBiggerTitle>{text('title', 'до 230 000 ₽')}</TextBoxBiggerTitle>
                        <TextBoxSubTitle>{text('description', 'На 18 месяцев, ставка 13,9%')}</TextBoxSubTitle>
                    </TextBox>
                    <Button
                        text="Label"
                        view="primary"
                        size="s"
                        scaleOnInteraction={false}
                        outlined={false}
                        resizible
                        style={{ marginTop: '1em' }}
                        tabIndex={-1}
                    />
                </CardContent>
            </CardBody>
        </Card>
    );
};

export const BasicDefault = () => {
    const cover = boolean('cover', false);

    return (
        <Card style={{ width: '20rem' }}>
            <CardBody>
                <CardMedia
                    src="./images/320_320_2.jpg"
                    placeholder="./images/320_320_3.jpg"
                    ratio={cover ? '1 / 1' : '16 / 9'}
                />
                <CardContent cover={cover}>
                    <TextBox>
                        <TextBoxBigTitle>{text('title', 'Киану Ривз')}</TextBoxBigTitle>
                        <TextBoxSubTitle>{text('footer1', 'Актёр')}</TextBoxSubTitle>
                        <CardParagraph1 style={{ marginTop: '0.75rem' }} lines={4}>
                            {longText}
                        </CardParagraph1>
                        <TextBoxSubTitle>{text('footer2', 'ru.wikipedia.org')}</TextBoxSubTitle>
                    </TextBox>
                </CardContent>
            </CardBody>
        </Card>
    );
};

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
