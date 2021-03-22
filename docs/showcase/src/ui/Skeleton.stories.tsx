import React from 'react';
import { boolean, select, number } from '@storybook/addon-knobs';
import { typography } from '@sberdevices/plasma-tokens';
import { radiuses, Roundness } from '@sberdevices/plasma-core/mixins';
import { withSkeleton, WithSkeletonProps } from '@sberdevices/ui/hocs';
import { Button, ButtonProps } from '@sberdevices/ui/components/Button';
import {
    Card,
    CardBody,
    CardMedia,
    CardContent,
    CardHeadline1,
    CardHeadline3,
    CardFootnote1,
} from '@sberdevices/ui/components/Card';
import { LineSkeleton, TextSkeleton, RectSkeleton } from '@sberdevices/ui/components/Skeleton';
import type { TextSize } from '@sberdevices/ui/components/Skeleton/Skeleton';

import { CardShowcase, UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Content/Skeleton',
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const textSizes = Object.keys(typography) as TextSize[];
const roundnessKeys = Object.keys(radiuses).map((r) => String(r));
const useRoundnessKnob = () => Number(select('roundness', roundnessKeys, '16')) as Roundness;

const ButtonSkeleton = withSkeleton<ButtonProps & WithSkeletonProps>(Button as any);

const h1Style = { marginTop: '0.75rem' };
const f1Style = { marginTop: '0.375rem' };

const Line = ({ ...rest }) => (
    <LineSkeleton {...rest} size={select('size', textSizes, 'body1')} roundness={useRoundnessKnob()} />
);

const Text = ({ ...rest }) => (
    <TextSkeleton
        {...rest}
        lines={number('lines', 4)}
        size={select('size', textSizes, 'body1')}
        roundness={useRoundnessKnob()}
        width={!boolean('Variable width', false) ? 100 : ''}
    />
);

const Rect = ({ ...rest }) => (
    <RectSkeleton
        {...rest}
        width={`${number('width (rem)', 4)}rem`}
        height={`${number('height (rem)', 4)}rem`}
        roundness={useRoundnessKnob()}
    />
);

const InCard = ({ ...rest }) => {
    const r = useRoundnessKnob();
    const s = boolean('skeleton', true);
    return (
        <Card {...rest}>
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
                        resizible
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

const sections = {
    Elements: {
        Line: <Line key="line" style={{ width: '22.5rem' }} />,
        Rect: <Rect key="rect" />,
        Text: <Text key="text" style={{ width: '22.5rem' }} />,
    },
    Decorate: { Card: <InCard key="inCard" style={{ width: '22.5rem' }} /> },
};

export const Default = () => <CardShowcase sections={sections} colWidth="max-content" />;
