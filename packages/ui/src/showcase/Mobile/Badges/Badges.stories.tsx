import React from 'react';

import { InContainerDecorator } from '../../../helpers';
import { SectionName } from '../../SectionName';
import { ThemeProvider } from '../../ThemeProvider';

import { Badge } from '.';

export default {
    title: 'Showcase/Mobile',
    decorators: [InContainerDecorator],
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

export const Badges = () => (
    <ThemeProvider>
        <SectionName title="Badges" description="Небольшие бирки для ячеек и карточек" />
        <Badge style={{ maxWidth: '46rem' }} />
    </ThemeProvider>
);
