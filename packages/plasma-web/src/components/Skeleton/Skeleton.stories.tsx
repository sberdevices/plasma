import React from 'react';
import { boolean, select, number } from '@storybook/addon-knobs';
import { typography } from '@sberdevices/plasma-tokens-web';
import { radiuses, Roundness, TypographyTypes } from '@sberdevices/plasma-core';

import { withSkeleton, WithSkeletonProps } from '../../hocs';
import { Button as BasicButton, ButtonProps } from '../Button';

import { LineSkeleton, TextSkeleton, RectSkeleton } from '.';

const textSizes = Object.keys(typography) as TypographyTypes;
const roundnessKeys = Object.keys(radiuses).map((r) => String(r));
const useRoundnessKnob = () => Number(select('roundness', roundnessKeys, '16')) as Roundness;

const ButtonSkeleton = withSkeleton<ButtonProps & WithSkeletonProps>(BasicButton);

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

export const Button = () => <ButtonSkeleton text="test" skeleton />;
