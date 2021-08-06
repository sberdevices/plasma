import React from 'react';

import { AppStateContext, AppStateContextValue } from '../../src/components/PlasmaApp/AppStateContext';

const stub = () => {};

export const defaultValue: AppStateContextValue = {
    state: {
        history: [
            { name: 'name', data: null },
            { name: 'name1', data: null },
        ],
        ui: {
            character: 'sber',
            insets: { left: 0, top: 0, right: 0, bottom: 0 },
        },
    },
    dispatch: stub,
    pushHistory: stub,
    pushScreen: stub,
    popScreen: stub,
    goToScreen: stub,
    changeActiveScreenState: stub,
};

export const withAppState = (value?: AppStateContextValue) => (Story: React.ComponentType) => {
    return (
        <AppStateContext.Provider value={{ ...defaultValue, ...value }}>
            <Story />
        </AppStateContext.Provider>
    );
};
