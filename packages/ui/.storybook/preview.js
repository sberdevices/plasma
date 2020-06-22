import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

addParameters({
    backgrounds: [{ name: 'dark', value: '#0B121E', default: true }],
});

addDecorator((storyFn) => <div style={{ padding: 100 }}>{storyFn()}</div>);
