import React from 'react';

import { UIStoryDecorator } from '../../../helpers';

import { TopbarShowcase } from './Topbar';

export default {
    title: 'Showcase/Device',
    decorators: [UIStoryDecorator],
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

export function Topbar() {
    return (
        <div>
            <TopbarShowcase />
        </div>
    );
}
