import React, { useState } from 'react';
import { typography } from '@sberdevices/plasma-tokens-b2b';
import { radiuses, TypographyTypes } from '@sberdevices/plasma-core';
import { Story, Meta } from '@storybook/react';

import { withSkeleton, WithSkeletonProps } from '../../hocs';
import { Button as BasicButton, ButtonProps } from '../Button';

import { LineSkeleton, TextSkeleton, RectSkeleton, LineSkeletonProps, TextSkeletonProps, RectSkeletonProps } from '.';

const textSizes = (Object.keys(typography) as unknown) as TypographyTypes;
const roundnessKeys = Object.keys(radiuses).map((r) => String(r));
const ButtonSkeleton = withSkeleton<ButtonProps & WithSkeletonProps>(BasicButton);

export default {
    title: 'Content/Skeleton',
    argTypes: {
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
    },
} as Meta;

export const Line: Story<LineSkeletonProps> = (props) => <LineSkeleton {...props} />;

Line.args = {
    size: 'body1',
    roundness: 16,
};

export const Text: Story<TextSkeletonProps> = (props) => <TextSkeleton {...props} />;

Text.args = {
    lines: 4,
    size: 'body1',
    roundness: 16,
    width: 100,
};

export const Rect: Story<RectSkeletonProps> = ({ width, height, ...props }) => (
    <RectSkeleton width={`${width}rem`} height={`${height}rem`} {...props} />
);

Rect.args = {
    roundness: 16,
    width: 4,
    height: 4,
};

export const Button = () => {
    const [skeleton, setSkeleton] = useState(false);

    return (
        <ButtonSkeleton
            type="button"
            text={skeleton ? 'Загрузка' : 'Нажмите'}
            skeleton={skeleton}
            aria-busy={skeleton}
            onClick={() => setSkeleton((prevValue) => !prevValue)}
        />
    );
};
