import React, { useReducer } from 'react';
import { AssistantClientCustomizedCommand } from '@sberdevices/assistant-client';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';
import { DeviceThemeProvider } from '@sberdevices/plasma-ui';

import { useInitializeAssistant } from '../../hooks/useInitializeAssistant';
import { PageProps } from '../Page/Page';
import { usePopHistoryListener } from '../../hooks/usePopHistoryListener';
import { GlobalStyles } from '../GlobalStyles/GlobalStyles';
import { initialState as initialPlasmaAppState, reducer } from '../../store/reducer';
import * as Actions from '../../store/actions';
import { last } from '../../utils/last';
import { PushScreenFn } from '../Page/types';
import { AnyObject } from '../../types';
import { isPlasmaAppAction, isPopHistoryAction, isPushHistoryAction } from '../../store/guards';
import { PlasmaAction, History } from '../../store/types';
import { InitializeParams } from '../../assistant';

import { AssistantContext } from './AssistantContext';
import { AppStateContext } from './AppStateContext';

export type OnStartFn<
    PageStateType extends AnyObject = AnyObject,
    PageParamsType extends Partial<Record<keyof PageStateType, unknown>> = Partial<Record<keyof PageStateType, unknown>>
> = (params: {
    pushHistory: <T extends keyof PageStateType>(name: T, data: PageStateType[T]) => void;
    pushScreen: PushScreenFn<PageStateType, PageParamsType>;
}) => void;

export interface OnStartWithOptions {
    callback: OnStartFn;
    waitForCommand?: string;
}

export interface PlasmaAppProps<Name extends string = string> {
    children: React.ReactElement<PageProps<Name>> | React.ReactElement<PageProps<Name>>[];
    assistantParams: Omit<InitializeParams, 'getState'>;
    header?: HeaderProps;
    onStart?: OnStartFn | OnStartWithOptions;
}

export function App<Name extends string>({
    children,
    assistantParams,
    header,
    onStart,
}: React.PropsWithChildren<PlasmaAppProps<Name>>): React.ReactElement {
    const [state, dispatch] = useReducer(reducer, initialPlasmaAppState);
    const popScreenDelta = React.useRef(1);

    const { history } = state;
    const activeScreen = last(history);

    const pushHistory = React.useCallback((name, data) => {
        window.history.pushState(null, name);
        dispatch(Actions.pushHistory(name, data));
    }, []);

    const pushScreen = React.useCallback((name: string, params) => {
        window.history.pushState(params, name);
        dispatch(Actions.pushHistory(name, null));
    }, []);

    const replacePreviousScreens = React.useCallback(
        (screens: Array<{ name: string; params?: any }>) => {
            const currentName = activeScreen.name;
            const currentData = activeScreen.data;
            screens.forEach(({ name, params }) => {
                window.history.pushState(params, name);
            });
            window.history.pushState(currentData, currentName);
            dispatch(Actions.replacePreviousHistory(screens.map((screen) => ({ name: screen.name, data: null }))));
        },
        [activeScreen],
    );

    const onPopScreen = React.useCallback(() => {
        dispatch(Actions.popHistory(popScreenDelta.current));
        /* В случае, если popScreen был вызван в результате вызова goToScreen, то после прыжка в несколько экранов
           необходимо вернуть стандартный переход в один экран
        */
        popScreenDelta.current = 1;
    }, []);

    const popScreen = React.useCallback(() => {
        window.history.back();
    }, []);

    const goToScreen = React.useCallback(
        (name: string) => {
            const screenIndex = history.findIndex((screenState) => screenState.name === name);

            if (screenIndex >= 0) {
                const delta = history.length - screenIndex - 1;

                if (delta && delta < history.length) {
                    popScreenDelta.current = delta;
                    window.history.go(-delta);
                }
            }
        },
        [history],
    );

    const changeActiveScreenState = React.useCallback(
        (data: History) => dispatch(Actions.changeActiveScreenState(data)),
        [dispatch],
    );

    const onData = (command: AssistantClientCustomizedCommand<PlasmaAction>) => {
        switch (command.type) {
            case 'insets':
                dispatch(Actions.setInsets(command.insets));
                return;
            case 'character':
                dispatch(Actions.setCharacter(command.character.id));
                return;
            case 'smart_app_data': {
                if (isPlasmaAppAction(command.smart_app_data)) {
                    if (isPushHistoryAction(command.smart_app_data)) {
                        const { name, data } = command.smart_app_data.payload.history;
                        pushHistory(name, data);
                    } else if (isPopHistoryAction(command.smart_app_data)) {
                        popScreen();
                    } else {
                        dispatch(command.smart_app_data);
                    }
                }

                break;
            }
            default:
        }
    };

    const assistantContextValue = useInitializeAssistant({
        assistantParams,
        onStart: () => {
            if (typeof onStart === 'function') {
                onStart?.({ pushScreen, pushHistory });
            } else {
                onStart?.callback({ pushScreen, pushHistory });
            }
        },
        onStartWaitForCommand: typeof onStart === 'object' ? onStart?.waitForCommand : undefined,
        onData: (c) => onData(c as AssistantClientCustomizedCommand<PlasmaAction>),
    });

    usePopHistoryListener(state.history.length, onPopScreen);

    const appStateContextValue = React.useMemo(
        () => ({
            state,
            header,
            pushScreen,
            replacePreviousScreens,
            pushHistory,
            popScreen,
            goToScreen,
            changeActiveScreenState,
            dispatch,
        }),
        [
            state,
            header,
            pushScreen,
            replacePreviousScreens,
            popScreen,
            pushHistory,
            goToScreen,
            changeActiveScreenState,
        ],
    );

    const childToRender = React.useMemo(() => {
        const childArray = React.Children.toArray(children) as React.ReactElement<PageProps<Name>>[];

        if (childArray.length === 1 && state.history.length > 0) {
            return childArray[0];
        }

        return childArray.find((child) => child.props.name === activeScreen?.name) as NonNullable<
            typeof childArray[number]
        >;
    }, [activeScreen?.name, children, state.history.length]);

    return (
        <AssistantContext.Provider value={assistantContextValue}>
            <AppStateContext.Provider value={appStateContextValue}>
                <DeviceThemeProvider>
                    <GlobalStyles />
                    {childToRender}
                </DeviceThemeProvider>
            </AppStateContext.Provider>
        </AssistantContext.Provider>
    );
}

export const PlasmaApp = React.memo(App);
