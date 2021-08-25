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

    return React.useMemo(() => {
        const devicePixelRatio = process.env.NODE_ENV === 'development' ? 1 : window.devicePixelRatio;
        const { top, bottom, left, right } = insets;

        return {
            top: top / devicePixelRatio,
            bottom: bottom / devicePixelRatio,
            left: left / devicePixelRatio,
            right: right / devicePixelRatio,
        };
    }, [insets]);
}
