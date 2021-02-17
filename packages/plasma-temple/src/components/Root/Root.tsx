import React from 'react';
import type { AssistantCharacterType } from '@sberdevices/assistant-client/dist/typings';

import type { PageProps } from '../../types';
import { PageLayout } from '../PageLayout/PageLayout';
import { GlobalStyles } from '../GlobalStyles/GlobalStyles';
import { LazyPage } from '../LazyPage/LazyPage';

export interface RootProps extends PageProps {
    theme: AssistantCharacterType;
    Component: React.ComponentType<PageProps>;
}

export const Root: React.FC<RootProps> = ({ theme, Component, ...props }) => {
    return (
        <>
            <GlobalStyles theme={theme} />
            <PageLayout>
                <LazyPage>
                    <Component {...props} />
                </LazyPage>
            </PageLayout>
        </>
    );
};
