import React from 'react';

import type { AssistantInstance, CanvasAppConfig, Screen, OnData, InnerAssistantAction, PageProps } from './types';
import { last } from './utils/last';
import { defaultConfig } from './utils/config';
import { reducer } from './store/reducer';
import { useAssistantAction, useOnDataHandler } from './hooks/useAssistantAction';
import { useHistoryUpdater } from './hooks/useHistoryUpdater';
import { usePopHistoryListener } from './hooks/usePopHistoryListener';
import { useStore } from './hooks/useStore';
import { Root } from './components/Root/Root';
import { CanvasAppContext } from './canvasAppContext';

const mergeConfigs = (source: CanvasAppConfig): CanvasAppConfig => {
    return {
        ...source,
        routes: defaultConfig.routes.map((route) => {
            const { type } = route;
            const sourceRoute = source.routes.find((srcRoute) => srcRoute.type === type);

            return {
                ...route,
                ...sourceRoute,
            };
        }),
        header: {
            ...defaultConfig.header,
            ...source.header,
        },
        assistant: {
            ...defaultConfig.assistant,
            ...source.assistant,
        },
    };
};

type ComponentMap = Record<
    Screen,
    React.ComponentType<PageProps> | React.LazyExoticComponent<React.ComponentType<PageProps>>
>;

export const createApp = (conf?: CanvasAppConfig): React.FC => {
    const config = conf ? mergeConfigs(conf) : defaultConfig;

    const mapComponents: ComponentMap = config.routes.reduce((acc, route) => {
        if (route.component) {
            acc[route.type] = route.component;
        }

        return acc;
    }, {} as ComponentMap);

    return React.memo(() => {
        const [state, dispatch] = React.useReducer(reducer, {
            history: [],
            theme: 'sber',
        });

        const record = last(state.history);
        const configRoute = React.useMemo(() => config.routes.find((route) => route.type === record?.type), [record]);
        const assistantRef = React.useRef<AssistantInstance>(null);
        const stateRef = React.useRef({ item_selector: { items: [] } });

        const onDataCallback = React.useCallback<OnData>(
            (...args) => {
                if (configRoute?.assistant?.onData) {
                    return configRoute.assistant.onData(...args);
                }

                if (config.assistant.onData) {
                    return config.assistant.onData(...args);
                }
            },
            [configRoute],
        );

        const getState = React.useCallback(() => stateRef.current, []);

        usePopHistoryListener(state.history.length, config.onPopState);
        useHistoryUpdater(record);
        useStore(dispatch);
        useAssistantAction(assistantRef, { ...config.assistant, getState }, config.assistant.onStart);
        useOnDataHandler(onDataCallback);

        const sendData = React.useCallback<AssistantInstance['sendData']>((params) => {
            /**
             * перехват кастомного экшена для обработки на клиенте
             * параметры экшена будут переданы в AssistantClient.onData в виде `smart_app_data` экшена
             */
            if (params.name === 'REQUEST_DATA') {
                const { action } = params as InnerAssistantAction;

                if (window.AssistantClient?.onData) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    window.AssistantClient.onData({
                        type: 'smart_app_data',
                        action: {
                            type: action.action_id,
                            payload: action.parameters,
                        },
                    });
                }

                return;
            }
            if (assistantRef.current) {
                assistantRef.current.sendData(params);
            }
        }, []);

        const Component: React.ComponentType<PageProps> | null = React.useMemo(() => {
            if (!record) {
                return () => null;
            }

            return mapComponents[record.type];
        }, [record]);

        const dataProps = React.useMemo(() => {
            return {
                data: record?.data,
                header: {
                    ...config.header,
                    ...configRoute?.header,
                },
            };
        }, [configRoute, record]);

        return (
            <CanvasAppContext.Provider value={{ assistant: assistantRef.current, configRoute  }}>
                <Root
                    theme={state.theme}
                    dispatch={dispatch}
                    sendData={sendData}
                    step={record?.step}
                    stateRef={stateRef}
                    nextRoute={configRoute?.next}
                    position={record?.position}
                    Component={Component}
                    {...dataProps}
                />
            </CanvasAppContext.Provider>
        );
    });
};
