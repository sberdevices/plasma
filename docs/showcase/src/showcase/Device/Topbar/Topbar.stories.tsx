import React from 'react';

import { DeviceStoryDecorator } from '../../../helpers';

import { TopbarShowcase } from './Topbar';

export default {
    title: 'Showcase/Device',
    decorators: [DeviceStoryDecorator],
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
