import React from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import { IconDownload } from '@sberdevices/plasma-icons';

import { InSpacingDecorator, disableProps } from '../../helpers';
import { applySpacing, SpacingProps } from '../../mixins';
import { Button } from '../Button';
import { TextField } from '../TextField';

import { Tooltip, TooltipProps, Placement } from '.';

const placements: Array<Placement> = [
    'top',
    'top-start',
    'top-end',

    'bottom',
    'bottom-start',
    'bottom-end',

    'left',
    'right',
];

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, max-content);
    grid-gap: 1rem 3.5rem;
    padding: 2.5rem;
`;

export default {
    title: 'Controls/Tooltip',
    decorators: [InSpacingDecorator],
} as Meta;

export const All = () => {
    return (
        <StyledGrid>
            <Tooltip placement="top-start" isVisible arrow text="Top start" animated={false}>
                <Tooltip placement="left" isVisible arrow text="Left" animated={false}>
                    <Button contentLeft={<IconDownload />} />
                </Tooltip>
            </Tooltip>
            <Tooltip placement="top" isVisible arrow text="Top" animated={false}>
                <Button contentLeft={<IconDownload />} />
            </Tooltip>
            <Tooltip placement="top-end" isVisible arrow text="Top end" animated={false}>
                <Tooltip placement="right" isVisible arrow text="Right" animated={false}>
                    <Button contentLeft={<IconDownload />} />
                </Tooltip>
            </Tooltip>
            <Tooltip placement="bottom-start" isVisible arrow text="Bottom start" animated={false}>
                <Button contentLeft={<IconDownload />} />
            </Tooltip>
            <Tooltip placement="bottom" isVisible arrow text="Bottom" animated={false}>
                <Button contentLeft={<IconDownload />} />
            </Tooltip>
            <Tooltip placement="bottom-end" isVisible arrow text="Bottom end" animated={false}>
                <Button contentLeft={<IconDownload />} />
            </Tooltip>
        </StyledGrid>
    );
};

const StyledRow = styled.div<SpacingProps>`
    ${applySpacing}
    display: flex;
`;

export const Live: Story<TooltipProps> = (args) => {
    const [isVisibleA, setVisibleA] = React.useState(false);
    const [isVisibleB, setVisibleB] = React.useState(false);

    return (
        <>
            <StyledRow mb="8x">
                <Tooltip
                    {...args}
                    id="example-tooltip-firstname"
                    text="Введите имя"
                    isVisible={isVisibleA}
                    onDismiss={() => setVisibleA(false)}
                    onFocus={() => setVisibleA(true)}
                    onMouseOver={() => setVisibleA(true)}
                    onBlur={() => setVisibleA(false)}
                    onMouseOut={() => setVisibleA(false)}
                >
                    <TextField label="Имя" aria-describedby="example-tooltip-firstname" />
                </Tooltip>
            </StyledRow>
            <StyledRow mb="8x">
                <Tooltip
                    {...args}
                    id="example-tooltip-lastname"
                    text="Введите фамилию"
                    isVisible={isVisibleB}
                    onDismiss={() => setVisibleB(false)}
                    onFocus={() => setVisibleB(true)}
                    onMouseOver={() => setVisibleB(true)}
                    onBlur={() => setVisibleB(false)}
                    onMouseOut={() => setVisibleB(false)}
                >
                    <TextField label="Фамилия" aria-describedby="example-tooltip-lastname" />
                </Tooltip>
            </StyledRow>
        </>
    );
};

Live.args = {
    placement: 'bottom',
    animated: true,
    arrow: true,
};

Live.argTypes = {
    placement: {
        control: {
            type: 'select',
            options: placements,
        },
    },
    ...disableProps(['isVisible']),
};
