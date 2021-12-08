import React from 'react';
import { PlasmaApp, Page, OnStartFn } from '@sberdevices/plasma-temple';

import { AppHeaderProps, AssistantProps, PageStateType } from './types';
import { Gallery } from './pages/Gallery';
import { Film } from './pages/Film';

if (!process.env.REACT_APP_DEV_PHRASE || !process.env.REACT_APP_DEV_TOKEN) {
    throw new Error('Скопируйте .env.sample в файл .env.development и подставьте корректные значения');
}

const assistantParams: AssistantProps = {
    initPhrase: process.env.REACT_APP_DEV_PHRASE,
    token: process.env.REACT_APP_DEV_TOKEN,
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
