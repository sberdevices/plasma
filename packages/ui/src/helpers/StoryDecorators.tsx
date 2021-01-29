import React from 'react';
import { boolean } from '@storybook/addon-knobs';

import { Container } from '../components/Grid';

import { GridLines } from './GridLines';

export const InSpacing = (Story) => (
    <div style={{ padding: '1rem' }}>
        <Story />
    </div>
);

export const WithGridLines = (Story) => (
    <>
        {boolean('Display grid', true) && <GridLines />}
        <Story />
    </>
);

export const InContainer = (Story) => (
    <Container>
        <Story />
    </Container>
);
