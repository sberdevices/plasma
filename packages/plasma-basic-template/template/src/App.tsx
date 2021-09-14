import React from 'react';
import { PlasmaApp, Page, OnStartFn } from '@sberdevices/plasma-temple';

import { AppHeaderProps, AssistantProps, PageStateType } from './types';
import { Gallery } from './pages/Gallery';
import { Film } from './pages/Film';

const assistantParams: AssistantProps = {
    initPhrase: 'запусти проверочка',
    token: process.env.REACT_APP_SMARTAPP_TOKEN,
};

const headerProps: AppHeaderProps = {
    title: 'Галерея фильмов',
    logo: '/logo.png',
};

// После того как ассистент готов к работе открываем экран галереи
const onStart: OnStartFn<PageStateType, {}> = ({ pushScreen }) => {
    pushScreen('gallery');
};

export const App: React.FC = () => {
    return (
        <PlasmaApp onStart={onStart} assistantParams={assistantParams} header={headerProps}>
            <Page name="gallery" component={Gallery} ignoreInsets />
            <Page name="film" component={Film} ignoreInsets />
        </PlasmaApp>
    );
};

export default App;
