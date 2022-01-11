import React from 'react';
import type { MountReturn } from '@cypress/react';
import {
    AssistantClientCustomizedCommand,
    AssistantSmartAppData,
    createAssistantHostMock,
} from '@sberdevices/assistant-client';
import { mount } from '@sberdevices/plasma-cy-utils';

import { OnStartFn, PlasmaApp } from '../components/PlasmaApp/PlasmaApp';
import { GetInitialProps, Page, PageProps } from '../components/Page/Page';

// eslint-disable-next-line import/no-mutable-exports
let mockAssistant: ReturnType<typeof createAssistantHostMock>;

interface OuterProps<T> {
    (props: T): Partial<T>;
}

export function wrapComponent<T extends React.ComponentType<any>>(
    Component: React.ComponentType<React.ComponentProps<T>>,
    outerProps?: OuterProps<React.ComponentProps<T>> | Partial<React.ComponentProps<T>>,
) {
    return (props: React.ComponentProps<T> & ReturnType<OuterProps<React.ComponentProps<T>>>) => {
        let renderProps = {
            ...props,
        };

        if (typeof outerProps === 'function') {
            renderProps = {
                ...renderProps,
                ...outerProps(props),
            };
        } else {
            renderProps = {
                ...props,
                ...outerProps,
            };
        }

        return <Component {...renderProps} />;
    };
}

const appProps = {
    header: {
        title: 'Cypress Test',
    },
    assistantParams: {
        initPhrase: 'запусти тестирование плазма храма',
    },
};

interface SingleScreenProps<N extends string> extends PageProps<N> {
    lazy?: boolean;
}

interface StartApp {
    <K extends string, S extends { [key in K]: unknown }, P = { [key in K]?: unknown }>(
        pages: Array<
            SingleScreenProps<K> & {
                getInitialProps?: GetInitialProps<any, S[K]>;
            }
        >,
        onStart: OnStartFn<S, P>,
        commands?: AssistantClientCustomizedCommand<AssistantSmartAppData>[],
    ): Cypress.Chainable<MountReturn>;
}

export const startApp: StartApp = (pages, onStart, commands = []) => {
    const pagesToRender = pages.map((config) => {
        if (config.lazy) {
            return {
                name: config.name,
                component: Page.lazy(() =>
                    Cypress.Promise.resolve({
                        default: config.component,
                        getInitialProps: config.getInitialProps,
                    }),
                ),
            };
        }

        return config;
    });

    return cy.window().then((win) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        win.appInitialData = commands;
        mockAssistant = createAssistantHostMock({ context: win });

        Cypress.Commands.add('sendAction', (val) => {
            return new Cypress.Promise((resolve) => {
                Cypress.log({
                    message: `send action with ${val.type}`,
                    name: 'Assistant Action',
                });
                mockAssistant.receiveCommand(val).then(() => resolve());
            });
        });

        return mount(
            <PlasmaApp {...appProps} onStart={onStart}>
                {pagesToRender.map((page) => {
                    return <Page key={page.name} name={page.name} component={page.component} />;
                })}
            </PlasmaApp>,
        );
    });
};

function sendAction<T extends Partial<AssistantClientCustomizedCommand<AssistantSmartAppData>>>(command: T) {
    const sendedCommand = {
        ...command,
        // eslint-disable-next-line @typescript-eslint/camelcase
        sdk_meta: {},
    } as AssistantClientCustomizedCommand<AssistantSmartAppData>;
    mockAssistant.receiveCommand(sendedCommand);
}

export { mockAssistant, sendAction };
