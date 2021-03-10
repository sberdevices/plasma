import React from 'react';
import { createAssistantHostMock } from '@sberdevices/assistant-client';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { createApp } from './createApp';
import { OnData, OnStart, Screen, GalleryItemViewPayload } from './types';

jest.mock('@sberdevices/assistant-client', () => jest.requireActual('@sberdevices/assistant-client'));

jest.mock('./utils/config.ts', () => {
    return {
        defaultConfig: {
            routes: [
                {
                    type: 'Screen.Gallery',
                    component: (props) => JSON.stringify(props, null, 4),
                },
                {
                    type: "Screen.Entity",
                    component: (props) => JSON.stringify(props, null, 4),
                },
                {
                    type: "Screen.Detail",
                },
            ]
        }
    };
});

const onStart: OnStart = jest.fn(({ pushState }) => {
    const items: GalleryItemViewPayload[] = Array.from({ length: 5 }, (_, index) => ({
        id: `${index}`,
        label: `Card ${index + 1}`,
        position: 1 + index,
        image: {
            src: 'https://via.placeholder.com/392.png',
            ratio: '1 / 1',
        },
    }));

    pushState({
        type: Screen.gallery,
        data: [
            {
                id: 'id',
                title: 'Basic Gallery',
                items,
            },
        ],
        step: 0,
        position: 0,
    });
});

const onDataGetter = (isPush: boolean): OnData =>
    jest.fn((action, { pushState, setState }) => {
        const items: GalleryItemViewPayload[] = Array.from({ length: 5 }, (_, index) => ({
            id: `${index}`,
            label: `Card ${index + 1}`,
            position: 1 + index,
            image: {
                src: 'https://via.placeholder.com/392.png',
                ratio: '1 / 1',
            },
        }));

        const data = {
            title: `Card ${action.payload.id}`,
            background: {
                src: `https://via.placeholder.com/1920x1080.png/?text=Card ${action.payload.id}`,
            },
            entities: items.filter(({ id }) => id !== action.payload.id),
            entitiesTitle: 'Другие карточки',
            itemShowButtonText: 'Button text',
            id: action.payload.id as string,
            description: [
                {
                    title: 'Description',
                    content: `Card ${action.payload.id}`,
                },
            ],
        };

        if (action.type === 'ITEM/SHOW') {
            if (isPush) {
                pushState({
                    type: Screen.entity,
                    data,
                    step: 0,
                    position: 0,
                });
            } else {
                setState({
                    data,
                    step: 0,
                    position: 0,
                });
            }
        }
    });

const mock = createAssistantHostMock({ context: window });

let rootContainer: HTMLDivElement | null;

const galleryOnData = onDataGetter(true);
const entityOnData = onDataGetter(false);

const App = createApp({
    routes: [
        { type: Screen.gallery, assistant: { onData: galleryOnData } },
        { type: Screen.entity, assistant: { onData: entityOnData } },
    ],
    header: {
        title: 'Plasma Basic App template',
    },
    assistant: {
        initPhrase: 'Привет!',
        onStart,
    },
});

const delay = () => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
};

describe('createApp', () => {
    beforeEach(() => {
        rootContainer = document.createElement('div');
        document.body.appendChild(rootContainer);

        act(() => {
            render(<App />, rootContainer, () => {
                mock.onReady(() => {
                    mock.receiveCommand({
                        type: 'smart_app_data',
                        action: {
                            type: 'INIT',
                        },
                    });
                });
            });
        });
    });

    afterEach(() => {
        unmountComponentAtNode(rootContainer);
        document.body.removeChild(rootContainer);
        rootContainer = null;
    });

    it('first render call onStart fn', async () => {
        await act(async () => {
            await delay(); // work-around чтобы дождаться инициализации AssistantClient

            expect(onStart).toBeCalled();
        });
    });

    it('onData handler is call', () => {
        mock.receiveCommand({
            type: 'smart_app_data',
            action: {
                type: 'ITEM/SHOW',
                payload: {
                    id: '0',
                }
            }
        }).then(() => {
            expect(galleryOnData).toHaveBeenCalled();
        });
    });
});
