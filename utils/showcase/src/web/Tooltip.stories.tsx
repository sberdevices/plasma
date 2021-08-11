import React from 'react';
import styled from 'styled-components';
import { Tooltip, Button } from '@sberdevices/plasma-web';
import { IconDownload } from '@sberdevices/plasma-icons';

import { WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Controls/Tooltip',
    component: Tooltip,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

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
