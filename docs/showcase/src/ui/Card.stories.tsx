import React from 'react';
import { Button } from '@sberdevices/ui/components/Button';
import { Card, CardBody, CardMedia, CardContent, CardParagraph1 } from '@sberdevices/ui/components/Card';
import { Cell, CellListItem, CellIcon, CellDisclosure } from '@sberdevices/ui/components/Cell';
import { Body1 } from '@sberdevices/ui/components/Typography';
import {
    TextBox,
    TextBoxBigTitle,
    TextBoxBiggerTitle,
    TextBoxTitle,
    TextBoxSubTitle,
} from '@sberdevices/ui/components/TextBox';

import { CardShowcase, IconPlaceholder, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Content/Card',
    component: Card,
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const cellList = [0, 0, 0];

const sections = {
    'Basic Card': {
        Default: (
            <Card tabIndex={-1} outlined scaleOnFocus>
                <CardBody>
                    <CardMedia src="./images/320_320_0.jpg" ratio="16 / 9" />
                    <CardContent>
                        <TextBox>
                            <TextBoxBigTitle>Киану Ривз</TextBoxBigTitle>
                            <TextBoxSubTitle>Актёр</TextBoxSubTitle>
                            <CardParagraph1 style={{ marginTop: '0.75rem' }} lines={4}>
                                Канадский актёр, кинопродюсер, и музыкант. Наиболее известен своими ролями в киносериях
                                «Матрица» и «Джон Уик», а также в фильмах «На гребне волны», «Мой личный штат Айдахо»,
                                «Дракула», «Скорость», «Джонни-мнемоник», «Адвокат дьявола», «Константин: Повелитель
                                тьмы» и «Короли улиц».
                            </CardParagraph1>
                            <TextBoxSubTitle>ru.wikipedia.org</TextBoxSubTitle>
                        </TextBox>
                        <Button
                            resizible
                            text="Label"
                            view="primary"
                            size="s"
                            scaleOnInteraction={false}
                            outlined={false}
                            style={{ marginTop: '1em' }}
                            tabIndex={-1}
                        />
                    </CardContent>
                </CardBody>
            </Card>
        ),
        'BG Image': (
            <Card tabIndex={-1} outlined scaleOnFocus>
                <CardBody>
                    <CardMedia src="./images/320_320_1.jpg" ratio="3 / 4" />
                    <CardContent cover>
                        <TextBox>
                            <TextBoxBigTitle>Киану Ривз</TextBoxBigTitle>
                            <TextBoxSubTitle>Актёр</TextBoxSubTitle>
                            <CardParagraph1 style={{ marginTop: '0.75rem' }} lines={4}>
                                Канадский актёр, кинопродюсер, и музыкант. Наиболее известен своими ролями в киносериях
                                «Матрица» и «Джон Уик», а также в фильмах «На гребне волны», «Мой личный штат Айдахо»,
                                «Дракула», «Скорость», «Джонни-мнемоник», «Адвокат дьявола», «Константин: Повелитель
                                тьмы» и «Короли улиц».
                            </CardParagraph1>
                            <TextBoxSubTitle>ru.wikipedia.org</TextBoxSubTitle>
                        </TextBox>
                    </CardContent>
                </CardBody>
            </Card>
        ),
        Value: (
            <Card tabIndex={-1} outlined scaleOnFocus>
                <CardBody>
                    <CardMedia src="./images/320_320_2.jpg" ratio="16 / 9" />
                    <CardContent>
                        <TextBox>
                            <TextBoxBigTitle>Потребительский кредит</TextBoxBigTitle>
                            <TextBoxBiggerTitle>до 230 000 ₽</TextBoxBiggerTitle>
                            <TextBoxSubTitle>На 18 месяцев, ставка 13,9%</TextBoxSubTitle>
                        </TextBox>
                        <Button
                            resizible
                            text="Label"
                            view="primary"
                            size="s"
                            scaleOnInteraction={false}
                            outlined={false}
                            style={{ marginTop: '1em' }}
                            tabIndex={-1}
                        />
                    </CardContent>
                </CardBody>
            </Card>
        ),
        'Value BG Image': (
            <Card tabIndex={-1} outlined scaleOnFocus>
                <CardBody>
                    <CardMedia src="./images/320_320_3.jpg" ratio="1 / 1" />
                    <CardContent cover>
                        <TextBox>
                            <TextBoxBigTitle>Джомолунгма</TextBoxBigTitle>
                            <TextBoxSubTitle>Вершина в Азии</TextBoxSubTitle>
                            <TextBoxBiggerTitle>8 848 м</TextBoxBiggerTitle>
                            <TextBoxSubTitle>Высота над уровнем моря</TextBoxSubTitle>
                        </TextBox>
                    </CardContent>
                </CardBody>
            </Card>
        ),
    },
    'List Card': {
        'Single, Title': (
            <Card tabIndex={-1} outlined scaleOnFocus>
                <CardContent compact>
                    <Cell
                        contentLeft={
                            <CellIcon>
                                <IconPlaceholder size="m" />
                            </CellIcon>
                        }
                        content={
                            <TextBox>
                                <TextBoxTitle>Title</TextBoxTitle>
                            </TextBox>
                        }
                        contentRight={<CellDisclosure />}
                    />
                </CardContent>
            </Card>
        ),
        'Single, Title + Subtitle': (
            <Card tabIndex={-1} outlined scaleOnFocus>
                <CardContent compact>
                    <Cell
                        contentLeft={
                            <CellIcon>
                                <IconPlaceholder size="m" />
                            </CellIcon>
                        }
                        content={
                            <TextBox>
                                <TextBoxTitle>Title</TextBoxTitle>
                                <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                            </TextBox>
                        }
                        contentRight={<CellDisclosure />}
                    />
                </CardContent>
            </Card>
        ),
        'List, No Header': (
            <Card>
                <CardContent compact>
                    {cellList.map((_, i) => (
                        <CellListItem
                            outlined
                            tabIndex={i}
                            key={`item:${i}`}
                            contentLeft={
                                <CellIcon>
                                    <IconPlaceholder size="m" />
                                </CellIcon>
                            }
                            content={
                                <TextBox>
                                    <TextBoxTitle>Title</TextBoxTitle>
                                    <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                                </TextBox>
                            }
                            contentRight={<CellDisclosure />}
                        />
                    ))}
                </CardContent>
            </Card>
        ),
        'List, With Header': (
            <Card>
                <CardContent compact>
                    <Cell
                        content={<TextBoxBigTitle>Название раздела</TextBoxBigTitle>}
                        contentRight={<Body1 style={{ marginTop: 5 }}>Detail</Body1>}
                    />
                    {cellList.map((_, i) => (
                        <CellListItem
                            outlined
                            tabIndex={i}
                            key={`item:${i}`}
                            contentLeft={
                                <CellIcon>
                                    <IconPlaceholder size="m" />
                                </CellIcon>
                            }
                            content={
                                <TextBox>
                                    <TextBoxTitle>Title</TextBoxTitle>
                                    <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                                </TextBox>
                            }
                            contentRight={<CellDisclosure />}
                        />
                    ))}
                </CardContent>
            </Card>
        ),
    },
    'Quick Answer': {
        Value: (
            <Card>
                <CardContent compact>
                    <Cell
                        content={<TextBoxBigTitle>Название раздела</TextBoxBigTitle>}
                        contentRight={<Body1 style={{ marginTop: 5 }}>Detail</Body1>}
                    />
                    <Cell
                        contentLeft={
                            <CellIcon>
                                <IconPlaceholder size="m" />
                            </CellIcon>
                        }
                        content={<TextBoxBiggerTitle>Value</TextBoxBiggerTitle>}
                        contentRight={
                            <CellIcon>
                                <IconPlaceholder style={{ marginTop: '0.375rem' }} size="s" />
                            </CellIcon>
                        }
                        alignRight="center"
                    />
                    <TextBoxSubTitle>Description</TextBoxSubTitle>
                </CardContent>
            </Card>
        ),
    },
};

export const Default = () => <CardShowcase sections={sections} />;
