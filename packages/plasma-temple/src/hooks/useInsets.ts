import { AssistantInsetsCommand } from '@sberdevices/assistant-client';
import React from 'react';

import { AppStateContext } from '../components/PlasmaApp/AppStateContext';

export type Insets = AssistantInsetsCommand['insets'];

export function useInsets(): Insets {
    const {
        state: {
            ui: { insets },
        },
    } = React.useContext(AppStateContext);

    return insets;
}
