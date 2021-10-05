import React from 'react';
import { Toast } from '@sberdevices/plasma-ui';

import { B2CStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'B2C/Controls/Toast',
    decorators: [B2CStoryDecorator, InSpacingDecorator],
};

export const Default = () => <Toast text="Short Text Message Without Action" />;
