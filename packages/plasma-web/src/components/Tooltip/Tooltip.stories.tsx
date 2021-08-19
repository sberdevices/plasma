import React from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import { IconDownload } from '@sberdevices/plasma-icons';

import { disableProps } from '../../helpers';
import { Button } from '../Button';

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
} as Meta;

export const Live = () => {
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

export const Default: Story<TooltipProps> = (args) => {
    const [isVisible, setVisible] = React.useState(false);

    return (
        <Tooltip isVisible={isVisible} {...args}>
            <Button
                text="Toggle"
                onClick={() => {
                    setVisible((isVis) => !isVis);
                }}
            />
        </Tooltip>
    );
};

Default.args = {
    placement: 'bottom',
    animated: true,
    arrow: true,
    text: 'Hello there.',
};

Default.argTypes = {
    placement: {
        control: {
            type: 'select',
            options: placements,
        },
    },
    ...disableProps(['isVisible']),
};
