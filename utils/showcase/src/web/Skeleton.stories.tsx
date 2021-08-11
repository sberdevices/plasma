import React from 'react';
import { boolean, select, number } from '@storybook/addon-knobs';
import { typography } from '@sberdevices/plasma-tokens-web';
import {
    Button,
    ButtonProps,
    LineSkeleton,
    TextSkeleton,
    RectSkeleton,
    TypographyTypes,
    radiuses,
    Roundness,
    withSkeleton,
    WithSkeletonProps,
} from '@sberdevices/plasma-web';

import { CardShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Content/Skeleton',
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const TypographyTypess = Object.keys(typography) as TypographyTypes[];
const roundnessKeys = Object.keys(radiuses).map((r) => String(r));
const useRoundnessKnob = () => Number(select('roundness', roundnessKeys, '16')) as Roundness;

const ButtonSkeleton = withSkeleton<ButtonProps & WithSkeletonProps>(Button as any);

const Line = ({ ...rest }) => (
    <LineSkeleton {...rest} size={select('size', TypographyTypess, 'body1')} roundness={useRoundnessKnob()} />
);

const Text = ({ ...rest }) => (
    <TextSkeleton
        {...rest}
        lines={number('lines', 4)}
        size={select('size', TypographyTypess, 'body1')}
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

const InButton = ({ ...rest }) => {
    const s = boolean('skeleton', true);

    return (
        <ButtonSkeleton
            stretch
            text={s ? 'Загрузка...' : 'Подробнее'}
            view="primary"
            size="s"
            outlined={false}
            style={{ marginTop: '1em' }}
            tabIndex={-1}
            skeleton={s}
            {...rest}
        />
    );
};

const sections = {
    Elements: {
        Line: <Line key="line" style={{ width: '22.5rem' }} />,
        Rect: <Rect key="rect" />,
        Text: <Text key="text" style={{ width: '22.5rem' }} />,
    },
    Decorate: { Card: <InButton key="inButton" style={{ width: '22.5rem' }} /> },
};

export const Default = () => <CardShowcase sections={sections} colWidth="max-content" />;
