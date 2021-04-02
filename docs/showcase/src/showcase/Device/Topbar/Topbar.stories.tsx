import React from 'react';

import { DeviceStoryDecorator, InContainerDecorator } from '../../../helpers';

import { TopbarShowcase } from './Topbar';

export default {
    title: 'Showcase/Device/Topbar',
    decorators: [DeviceStoryDecorator, InContainerDecorator],
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
