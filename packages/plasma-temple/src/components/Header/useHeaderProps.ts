import React from 'react';

import { AppStateContext } from '../PlasmaApp/AppStateContext';
import { isSberBoxLike } from '../../utils/deviceFamily';

import { HeaderProps } from './types';

export const useHeaderProps = (props: HeaderProps): HeaderProps => {
    const { minimize, back } = props;

    const {
        state: { history },
        popScreen,
    } = React.useContext(AppStateContext);

    if (isSberBoxLike() || back !== undefined || minimize !== undefined) {
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
