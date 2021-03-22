import React from 'react';
import { Toast } from '@sberdevices/ui/components/Toast';

import { UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Controls/Toast',
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

export const Default = () => <Toast text="Short Text Message Without Action" />;
