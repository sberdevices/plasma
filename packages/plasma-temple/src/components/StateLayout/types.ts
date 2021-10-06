import React from 'react';

import { ComponentPropsWithHeader } from '../Header/types';
import { ObjectFit } from '../../types';

export interface StateLayoutCommonProps extends ComponentPropsWithHeader {
    title: string;
    text?: string;
    button: React.ReactNode;
    background?: string;
    backgroundFit?: ObjectFit;
    backgroundWidth?: string;
    image?: string | React.ReactNode;
}
