import React from 'react';
import { isSberBox } from '@sberdevices/plasma-ui';

import { AppStateContext } from '../PlasmaApp/AppStateContext';

import { HeaderProps } from './types';

export const useHeaderProps = (props: HeaderProps): HeaderProps => {
    const { minimize, back } = props;

    const {
        state: { history },
        popScreen,
    } = React.useContext(AppStateContext);

    if (isSberBox() || back !== undefined || minimize !== undefined) {
        return props;
    }

    if (history.length === 1) {
        return {
            ...props,
            minimize: true,
            onMinimizeClick: popScreen,
        } as HeaderProps;
    }

    return {
        ...props,
        back: true,
        onBackClick: popScreen,
    } as HeaderProps;
};
