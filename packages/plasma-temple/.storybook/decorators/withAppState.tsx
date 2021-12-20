import { Insets } from '@sberdevices/assistant-client';
import React from 'react';

import { AppStateContext, AppStateContextValue } from '../../src/components/PlasmaApp/AppStateContext';

const stub = () => {};

export const defaultValue: AppStateContextValue = {
    state: {
        history: [],
        ui: {
            character: 'sber',
            insets: { left: 0, top: 0, right: 0, bottom: 0 },
        },
    },
    header: {
        title: 'Plasma Temple Storybook',
    },
    dispatch: stub,
    pushHistory: stub,
    pushScreen: stub,
    popScreen: stub,
    goToScreen: stub,
    changeActiveScreenState: stub,
};

const insets: Record<'sberBox' | 'sberPortal' | 'mobile', Insets> = {
    sberBox: { left: 0, top: 0, right: 0, bottom: 180 },
    sberPortal: { left: 0, top: 0, right: 0, bottom: 140 },
    mobile: { left: 0, top: 0, right: 0, bottom: 100 },
};

export const withAppState = (Story: React.ComponentType, context) => {
    const state = Object.assign(defaultValue, {
        state: {
            history: [],
            ui: {
                insets: insets[context.globals.typoSize],
            },
        },
    });
    return (
        <AppStateContext.Provider value={state}>
            <Story />
        </AppStateContext.Provider>
    );
};
