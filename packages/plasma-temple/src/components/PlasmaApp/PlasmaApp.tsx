import React, { useReducer } from 'react';
import { AssistantSmartAppData } from '@sberdevices/assistant-client';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { InitializeParams, useInitializeAssistant } from '../../hooks/useInitializeAssistant';
import { PageProps } from '../Page/Page';
import { AssistantContext } from './AssistantContext';
import { AppStateContext } from './AppStateContext';
import { usePopHistoryListener } from '../../hooks/usePopHistoryListener';
import { GlobalStyles } from '../GlobalStyles/GlobalStyles';
import { initialState as initialPlasmaAppState, reducer } from '../../store/reducer';
import * as Actions from '../../store/actions';
import { PageLayout } from '../PageLayout/PageLayout';
import { last } from '../../utils/last';

export interface PlasmaAppProps<Name extends string = string> {
    children: React.ReactElement<PageProps<Name>> | React.ReactElement<PageProps<Name>>[];
    assistantParams: Omit<InitializeParams, 'getState'>;
    header?: HeaderProps;
    onStart: (params: {
        pushScreen: <T extends string, P = unknown>(name: T, params?: P) => void;
        pushHistory: <T extends string, P = unknown>(name: T, history: P) => void;
    }) => void;
}

export function PlasmaApp<Name extends string, T extends AssistantSmartAppData = AssistantSmartAppData>({
    children,
    assistantParams,
    header,
    onStart,
}: React.PropsWithChildren<PlasmaAppProps<Name>>) {
    const [state, dispatch] = useReducer(reducer, initialPlasmaAppState);

    const pushHistory = React.useCallback((name, history) => {
        window.history.pushState(null, name);
        dispatch(Actions.pushHistory({ history }));
    }, []);

    const pushScreen = React.useCallback((name: string, params) => {
        window.history.pushState(params, name);
        dispatch(Actions.pushHistory({ history: { name, data: null } }));
    }, []);

    const onPopScreen = React.useCallback(() => {
        dispatch(Actions.popHistory());
    }, []);

    const popScreen = React.useCallback(() => {
        window.history.back();
    }, []);

    const assistantContextValue = useInitializeAssistant<T>({
        assistantParams,
        onStart: () => onStart({ pushScreen, pushHistory }),
        onData: (command) => {
            switch (command.type) {
                case 'insets':
                    dispatch(Actions.setInsets({ insets: command.insets }));
                    break;
                case 'character':
                    dispatch(Actions.setCharacter({ character: command.character.id }));
                    break;
                default:
                    return;
            }
        },
    });

    usePopHistoryListener(state.history.length, onPopScreen);

    const appStateContextValue = React.useMemo(
        () => ({
            state,
            header,
            pushScreen,
            pushHistory,
            popScreen,
            dispatch,
        }),
        [state, pushScreen, popScreen],
    );

    const activeScreen = last(state.history);

    return (
        <AssistantContext.Provider value={assistantContextValue}>
            <AppStateContext.Provider value={appStateContextValue}>
                <GlobalStyles character={state.ui.character} />
                <PageLayout>
                    {React.Children.count(children) === 1
                        ? state.history.length > 0 && children
                        : React.Children.map(children, (child) => {
                              const elementChild = child as React.ReactElement<PageProps<Name>>;
                              return elementChild.props.name === activeScreen?.name ? child : null;
                          })}
                </PageLayout>
            </AppStateContext.Provider>
        </AssistantContext.Provider>
    );
}
