import React from 'react';
import { Story, Meta } from '@storybook/react';

import { InSpacingDecorator, IconPlaceholder } from '../../helpers';
import { Button } from '../Button';
import { Cell, CellIcon, CellListItem, CellDisclosure } from '../Cell';
import { TextBox, TextBoxTitle, TextBoxSubTitle, TextBoxBiggerTitle, TextBoxBigTitle } from '../TextBox';

import { Card, CardProps } from './Card';
import { CardBody } from './CardBody';
import { CardContent } from './CardContent';
import { CardMedia } from './CardMedia';
import { CardParagraph1 } from './CardTypography';

const longText = `Канадский актёр, кинопродюсер, и музыкант. Наиболее известен своими ролями в киносериях «Матрица» и
«Джон Уик», а также в фильмах «На гребне волны», «Мой личный штат Айдахо», «Дракула», «Скорость»,
«Джонни-мнемоник», «Адвокат дьявола», «Константин: Повелитель тьмы» и «Короли улиц».`;

export default {
    title: 'Content/Card',
    decorators: [InSpacingDecorator],
} as Meta;

interface BasicValueProps extends CardProps {
    cover: boolean;
    coverGradient: boolean;
    subTitle: string;
    title: string;
    description: string;
}

export const BasicValue: Story<BasicValueProps> = ({
    outlined,
    coverGradient,
    scaleOnFocus,
    cover,
    subTitle,
    title,
    description,
}) => {
    return (
        <Card style={{ width: '22.5rem' }} tabIndex={0} outlined={outlined} scaleOnFocus={scaleOnFocus}>
            <CardBody>
                <CardMedia
                    src="./images/320_320_0.jpg"
                    placeholder="./images/320_320_1.jpg"
                    ratio={cover ? '1 / 1' : '16 / 9'}
                />
                <CardContent cover={cover as true} coverGradient={cover && coverGradient}>
                    <TextBox>
                        <TextBoxBigTitle>{subTitle}</TextBoxBigTitle>
                        <TextBoxBiggerTitle>{title}</TextBoxBiggerTitle>
                        <TextBoxSubTitle>{description}</TextBoxSubTitle>
                    </TextBox>
                    <Button
                        text="Label"
                        view="primary"
                        size="s"
                        scaleOnInteraction={false}
                        outlined={false}
                        stretch
                        style={{ marginTop: '1em' }}
                        tabIndex={-1}
                    />
                </CardContent>
            </CardBody>
        </Card>
    );
};

BasicValue.args = {
    cover: false,
    coverGradient: true,
    outlined: true,
    scaleOnFocus: true,
    subTitle: 'Потребительский кредит',
    title: 'до 230 000 ₽',
    description: 'На 18 месяцев, ставка 13,9%',
};

interface BasicDefaultProps {
    cover: boolean;
    title: string;
    footer1: string;
    footer2: string;
    description: string;
}

export const BasicDefault: Story<BasicDefaultProps> = ({ cover, title, footer1, footer2, description }) => {
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
                        <TextBoxBigTitle>{title}</TextBoxBigTitle>
                        <TextBoxSubTitle>{footer1}</TextBoxSubTitle>
                        <CardParagraph1 style={{ marginTop: '0.75rem' }} lines={4}>
                            {description}
                        </CardParagraph1>
                        <TextBoxSubTitle>{footer2}</TextBoxSubTitle>
                    </TextBox>
                </CardContent>
            </CardBody>
        </Card>
    );
};

BasicDefault.args = {
    cover: false,
    title: 'Киану Ривз',
    footer1: 'Актёр',
    footer2: 'ru.wikipedia.org',
    description: longText,
};

interface ListCardProps {
    title: string;
    subtitle: string;
}

export const ListCard: Story<ListCardProps> = ({ title, subtitle }) => (
    <Card style={{ width: '20rem' }}>
        <CardContent compact>
            <Cell
                contentLeft={
                    <CellIcon>
                        <IconPlaceholder size={2.25} />
                    </CellIcon>
                }
                content={
                    <TextBox>
                        <TextBoxTitle>{title}</TextBoxTitle>
                        <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                    </TextBox>
                }
                contentRight={<CellDisclosure />}
            />
        </CardContent>
    </Card>
);

ListCard.args = {
    title: 'Title',
    subtitle: 'Subtitle',
};

interface ListAndHeaderProps {
    listItems: number;
    header: string;
    details: string;
    title: string;
    subtitle: string;
}

export const ListAndHeader: Story<ListAndHeaderProps> = ({ listItems, header, details, title, subtitle }) => {
    const items = Array(listItems).fill(0);
    return (
        <Card style={{ width: '20rem' }}>
            <CardContent compact>
                <Cell
                    content={<TextBoxBigTitle>{header}</TextBoxBigTitle>}
                    contentRight={<span style={{ marginTop: 5 }}>{details}</span>}
                />
                {items.map((_, i) => (
                    <CellListItem
                        key={`item:${i}`}
                        contentLeft={
                            <CellIcon>
                                <IconPlaceholder size={2.25} />
                            </CellIcon>
                        }
                        content={
                            <TextBox>
                                <TextBoxTitle>{title}</TextBoxTitle>
                                <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                            </TextBox>
                        }
                        contentRight={<CellDisclosure />}
                    />
                ))}
            </CardContent>
        </Card>
    );
};

ListAndHeader.args = {
    listItems: 3,
    header: 'Название раздела',
    details: 'Detail',
    title: 'Title',
    subtitle: 'Subtitle',
};

interface FastAnswerProps {
    header: string;
    details: string;
    value: string;
    description: string;
}

export const FastAnswer: Story<FastAnswerProps> = ({ header, details, value, description }) => (
    <Card style={{ width: '20rem' }}>
        <CardContent compact>
            <Cell
                content={<TextBoxBigTitle>{header}</TextBoxBigTitle>}
                contentRight={<span style={{ marginTop: 5 }}>{details}</span>}
            />
            <Cell
                contentLeft={
                    <CellIcon>
                        <IconPlaceholder size={2.25} />
                    </CellIcon>
                }
                content={<TextBoxBiggerTitle>{value}</TextBoxBiggerTitle>}
                contentRight={
                    <CellIcon>
                        <IconPlaceholder style={{ marginTop: '0.375rem' }} size={1.5} />
                    </CellIcon>
                }
                alignRight="center"
            />
            <TextBoxSubTitle>{description}</TextBoxSubTitle>
        </CardContent>
    </Card>
);

FastAnswer.args = {
    header: 'Название раздела',
    details: 'Detail',
    value: 'Value',
    description: 'Description',
};
