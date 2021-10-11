import React from 'react';
import { text } from '@storybook/addon-knobs';
import { Button } from '@sberdevices/plasma-ui';

import { StateLayout } from '../src/components/StateLayout/StateLayout';

export default {
    title: 'Components/StateLayout',
};

export const Default: React.FC = () => (
    <StateLayout
        header={{ title: 'Header Title' }}
        title={text('title', 'Юный космовед')}
        text={text('text', 'Вы посмотрели все темы про космос')}
        button={<Button text="Button" />}
    >
        Children
    </StateLayout>
);
