import React, { ReactNode } from 'react';
import { success, critical, accent } from '@sberdevices/plasma-tokens';
import { Spinner } from '@sberdevices/plasma-core';
import { IconDone, IconCross } from '@sberdevices/plasma-icons';

import { Type } from './types';

export const TypeIcons: { [key in Type]: ReactNode } = {
    success: <IconDone size="xs" color={success} />,
    error: <IconCross size="xs" color={critical} />,
    pending: <Spinner size="1rem" color={accent} />,
};
