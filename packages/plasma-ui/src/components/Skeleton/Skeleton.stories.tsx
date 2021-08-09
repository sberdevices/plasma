import React from 'react';
import { Story, Meta } from '@storybook/react';
import { typography } from '@sberdevices/plasma-tokens';
import { radiuses, Roundness, TypographyTypes } from '@sberdevices/plasma-core';

import { withSkeleton, WithSkeletonProps } from '../../hocs';
import { Button, ButtonProps } from '../Button';
import { Card, CardBody, CardMedia, CardContent, CardHeadline1, CardHeadline3, CardFootnote1 } from '../Card';

import { LineSkeleton, TextSkeleton, RectSkeleton } from '.';
import type { LineSkeletonProps, TextSkeletonProps, RectSkeletonProps } from '.';

const textSizes = Object.keys(typography) as TypographyTypes[];
const roundnessKeys = Object.keys(radiuses).map((r) => Number(r));

const ButtonSkeleton = withSkeleton<ButtonProps & WithSkeletonProps>(Button);

const h1Style = { marginTop: '0.75rem' };
const f1Style = { marginTop: '0.375rem' };

export default {
    title: 'Content/Skeleton',
} as Meta;

export const Line: Story<LineSkeletonProps> = (args) => <LineSkeleton {...args} />;

Line.args = {
    size: 'body1',
    roundness: 16 as Roundness,
};

Line.argTypes = {
    size: {
        control: {
            type: 'select',
            options: textSizes,
        },
    },
    roundness: {
        control: {
            type: 'select',
            options: roundnessKeys,
        },
    },
};

export const Text: Story<TextSkeletonProps & { variableWidth: boolean }> = ({ variableWidth, ...rest }) => (
    <TextSkeleton width={!variableWidth && 100} {...rest} />
);

Text.args = {
    lines: 4,
    size: 'body1',
    roundness: 16 as Roundness,
    variableWidth: false,
};

Text.argTypes = {
    ...Line.argTypes,
};

export const Rect: Story<RectSkeletonProps> = ({ width, height, ...rest }) => (
    <RectSkeleton width={`${width}rem`} height={`${height}rem`} {...rest} />
);

Rect.args = {
    width: 4,
    height: 4,
    roundness: 16 as Roundness,
};

Rect.argTypes = {
    width: {
        control: {
            type: 'number',
        },
    },
    height: {
        control: {
            type: 'number',
        },
    },
    roundness: {
        control: {
            type: 'select',
            options: roundnessKeys,
        },
    },
};

interface InCardProps {
    roundness: Roundness;
    skeleton: boolean;
}

export const InCard: Story<InCardProps> = ({ roundness, skeleton }) => {
    const r = roundness;
    const s = skeleton;
    return (
        <Card style={{ width: '20rem' }}>
            <CardBody>
                {s ? (
                    <RectSkeleton width="100%" height="12rem" roundness={0} />
                ) : (
                    <CardMedia src="./images/320_320_2.jpg" height="12rem" />
                )}
                <CardContent>
                    {s ? (
                        <>
                            <LineSkeleton size="headline3" roundness={r} />
                            <LineSkeleton size="headline1" roundness={r} style={h1Style} />
                            <LineSkeleton size="footnote1" roundness={r} style={f1Style} />
                        </>
                    ) : (
                        <>
                            <CardHeadline3>Потребительский кредит</CardHeadline3>
                            <CardHeadline1 style={h1Style}>до 230 000 ₽</CardHeadline1>
                            <CardFootnote1 style={f1Style} view="secondary">
                                На 18 месяцев, ставка 13,9%
                            </CardFootnote1>
                        </>
                    )}
                    <ButtonSkeleton
                        fullWidth
                        text={s ? 'Загрузка...' : 'Подробнее'}
                        view="primary"
                        size="s"
                        scaleOnInteraction={false}
                        outlined={false}
                        style={{ marginTop: '1em' }}
                        tabIndex={-1}
                        skeleton={s}
                    />
                </CardContent>
            </CardBody>
        </Card>
    );
};

InCard.args = {
    roundness: 16 as Roundness,
    skeleton: true,
};

InCard.argTypes = {
    roundness: {
        control: {
            type: 'select',
            options: roundnessKeys,
        },
    },
};

InCard.parameters = {
    chromatic: {
        disable: true,
    },
};
