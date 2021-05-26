import React from 'react';
import styled from 'styled-components';
import { Spinner } from '@sberdevices/plasma-ui';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { AppStateContext } from '../PlasmaApp/AppStateContext';
import { changeActiveScreenState } from '../../store/actions';
import { History } from '../../store/types';
import { AnyObject, AssistantInstance } from '../../types';
import { useAssistant } from '../../hooks/useAssistant';
import { last } from '../../utils/last';
import { INNER_ASSISTANT_ACTION } from '../../constants';
import { Layout } from '../../components/Layout/Layout';

import { PageComponent as PageComp } from './types';

export interface PageProps<Name extends string> {
    name: Name;
    component: PageComp<AnyObject, Name>;
    fallbackComponent?: React.ReactNode;
    header?: HeaderProps;
}

const StyledSpinner = styled(Spinner)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

function PageComponent<Name extends string>({
    name,
    component: Component,
    fallbackComponent = <StyledSpinner />,
    header,
}: PageProps<Name>): React.ReactElement {
    const { assistant, setAssistantState } = useAssistant();

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
                        smart_app_data: smartAppData,
                        // Для обратной совместимости
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        action: smartAppData,
                    });
                }
            }

            return () => {};
        },
        [assistant],
    );

    return (
        <React.Suspense fallback={fallbackComponent}>
            <Layout>
                <AppStateContext.Consumer>
                    {({ pushHistory, pushScreen, header: appHeader, popScreen, state, dispatch }) => (
                        <Component
                            name={name}
                            params={window.history.state}
                            state={last(state.history).data}
                            assistant={assistant}
                            setAssistantState={setAssistantState}
                            changeState={(data: Partial<History>) => dispatch(changeActiveScreenState(data))}
                            pushHistory={pushHistory}
                            pushScreen={pushScreen}
                            popScreen={popScreen}
                            sendData={sendData}
                            fallbackComponent={fallbackComponent}
                            header={header ?? appHeader}
                        />
                    )}
                </AppStateContext.Consumer>
            </Layout>
        </React.Suspense>
    );
}

export const Page = React.memo(PageComponent) as typeof PageComponent;
