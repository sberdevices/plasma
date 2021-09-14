import React from 'react';
import { Story as StoryType } from '@storybook/react';

export const InSpacing = (Story: StoryType) => (
    <div style={{ padding: '1rem' }}>
        <Story />
    </div>
);
