import React from 'react';
import { boolean, select, number } from '@storybook/addon-knobs';
import { typography } from '@sberdevices/plasma-tokens';
import { radiuses, Roundness } from '@sberdevices/plasma-core';

import { withSkeleton, WithSkeletonProps } from '../../hocs';
import { Button, ButtonProps } from '../Button';
import { Card, CardBody, CardMedia, CardContent, CardHeadline1, CardHeadline3, CardFootnote1 } from '../Card';

import { TextSize } from './Skeleton';

import { LineSkeleton, TextSkeleton, RectSkeleton } from '.';

const textSizes = Object.keys(typography) as TextSize[];
const roundnessKeys = Object.keys(radiuses).map((r) => String(r));
const useRoundnessKnob = () => Number(select('roundness', roundnessKeys, '16')) as Roundness;

const ButtonSkeleton = withSkeleton<ButtonProps & WithSkeletonProps>(Button);

const h1Style = { marginTop: '0.75rem' };
const f1Style = { marginTop: '0.375rem' };

export const Line = () => <LineSkeleton size={select('size', textSizes, 'body1')} roundness={useRoundnessKnob()} />;

export const Text = () => (
    <TextSkeleton
        lines={number('lines', 4)}
        size={select('size', textSizes, 'body1')}
        roundness={useRoundnessKnob()}
        width={!boolean('Variable width', false) && 100}
    />
);

export const Rect = () => (
    <RectSkeleton
        width={`${number('width (rem)', 4)}rem`}
        height={`${number('height (rem)', 4)}rem`}
        roundness={useRoundnessKnob()}
    />
);

export const InCard = () => {
    const r = useRoundnessKnob();
    const s = boolean('skeleton', true);
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

InCard.parameters = {
    chromatic: {
        disable: true,
    },
};
