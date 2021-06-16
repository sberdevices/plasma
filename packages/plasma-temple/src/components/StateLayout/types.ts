import React from 'react';

import { ComponentPropsWithHeader } from '../Header/types';

export interface StateLayoutCommonProps extends ComponentPropsWithHeader {
    title: string;
    text?: string;
    button: React.ReactNode;
    backgound?: string;
}
