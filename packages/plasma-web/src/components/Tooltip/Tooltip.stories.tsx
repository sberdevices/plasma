import React from 'react';
import styled from 'styled-components';
import { select, boolean, text } from '@storybook/addon-knobs';
import { IconDownload } from '@sberdevices/plasma-icons';

import { Button } from '../Button';

import { Tooltip, Placement } from '.';

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

export const Default = () => {
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

export const LiveDemo = () => {
    const placement = select('placement', placements, 'bottom');
    const [isVisible, setVisible] = React.useState(false);

    return (
        <Tooltip
            isVisible={isVisible}
            placement={placement}
            animated={boolean('animated', true)}
            arrow={boolean('arrow', true)}
            text={text('text', 'Hello there.')}
        >
            <Button
                text="Toggle"
                onClick={() => {
                    setVisible((isVis) => !isVis);
                }}
            />
        </Tooltip>
    );
};
