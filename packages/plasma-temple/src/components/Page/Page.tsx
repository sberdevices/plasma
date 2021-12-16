import React from 'react';

import { AppStateContext } from '../PlasmaApp/AppStateContext';
import { AnyObject, AssistantInstance } from '../../types';
import { useAssistant } from '../../hooks/useAssistant';
import { last } from '../../utils/last';
import { INNER_ASSISTANT_ACTION } from '../../constants';
import { Layout } from '../../components/Layout/Layout';
import { PageSpinner } from '../PageSpinner/PageSpinner';
import { useMount } from '../../hooks';
import { History } from '../../store/types';
import { HeaderProps } from '../Header/types';

import { PageComponent as PageComp } from './types';

export interface PageProps<Name extends string> {
    name: Name;
    component: PageComp<AnyObject, Name>;
    fallbackComponent?: React.ReactNode;
    header?: HeaderProps;
    ignoreInsets?: boolean;
}

export interface GetInitialProps<P, R> {
    (context: P): Promise<R>;
    (context: P): R;
}

interface InitialPropsGetter<P, S> {
    getInitialProps?: GetInitialProps<P, S>;
}

interface PageLazyParams<
    C extends PageComp<AnyObject, string>,
    P extends React.ComponentProps<C> = React.ComponentProps<C>,
    Pp = Pick<P, 'params'>,
    Ss = P['state']
> extends InitialPropsGetter<Pp, Ss> {
    default: C & InitialPropsGetter<Pp, Ss>;
}

interface PageLazy {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lazy<T extends PageLazyParams<PageComp<AnyObject, any>>>(
        factory: () => Promise<T>,
    ): React.LazyExoticComponent<React.MemoExoticComponent<T['default']>>;
}

interface PageFunctionComponent extends PageLazy {
    <N extends keyof AnyObject>(props: PageProps<N>): React.ReactElement;
}

export const Page: PageFunctionComponent = ({
    name,
    component: Component,
    fallbackComponent = <PageSpinner />,
    header,
    ignoreInsets,
}) => {
    const { assistant, setAssistantState } = useAssistant();

    const {
        changeActiveScreenState,
        state,
        popScreen,
        pushHistory,
        pushScreen,
        goToScreen,
        header: appHeader,
    } = React.useContext(AppStateContext);

    const sendData = React.useCallback<AssistantInstance['sendData']>(
        (params) => {
            /**
             * перехват кастомного экшена для обработки на клиенте
             * параметры экшена будут переданы в AssistantClient.onData в виде `smart_app_data` экшена
             */
            if (params.name !== INNER_ASSISTANT_ACTION) {
                assistant.sendData(params);
            } else {
                const { action } = params;

                if (window.AssistantClient?.onData) {
                    const smartAppData = {
                        type: 'type' in action ? action.type : action.action_id,
                        payload: ('type' in action ? action.payload : action.parameters) ?? {},
                    };

                    window.AssistantClient.onData({
                        type: 'smart_app_data',
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        smart_app_data: smartAppData,
                        // Для обратной совместимости
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        action: smartAppData,
                    });
                }
            }

            return () => {};
        },
        [assistant],
    );

    const changeState = React.useCallback(
        (data: Partial<History>) => {
            changeActiveScreenState({
                name,
                data,
            });
        },
        [name, changeActiveScreenState],
    );

    return (
        <Layout ignoreInsets={ignoreInsets}>
            <React.Suspense fallback={fallbackComponent}>
                <Component
                    name={name}
                    params={window.history.state}
                    state={last(state.history).data}
                    assistant={assistant}
                    setAssistantState={setAssistantState}
                    changeState={changeState}
                    pushHistory={pushHistory}
                    pushScreen={pushScreen}
                    popScreen={popScreen}
                    goToScreen={goToScreen}
                    sendData={sendData}
                    fallbackComponent={fallbackComponent}
                    header={header ?? appHeader}
                />
            </React.Suspense>
        </Layout>
    );
};

Page.lazy = (factory) => {
    return React.lazy(async () => {
        const { default: Component, getInitialProps } = await factory();

        const Wrapper = (props: React.ComponentProps<typeof Component>) => {
            const { state, changeState, params } = props;

            useMount(() => {
                const promiseGetter = Component.getInitialProps ?? getInitialProps;

                if (!promiseGetter || state) {
                    return;
                }

                const promise = promiseGetter({ params });

                if (typeof promise.then === 'function') {
                    promise.then(changeState);
                } else {
                    changeState(promise);
                }
            });

            if (getInitialProps && !state) {
                return <PageSpinner />;
            }

            return <Component {...props} />;
        };

        return {
            default: React.memo(Wrapper),
        };
    });
};
