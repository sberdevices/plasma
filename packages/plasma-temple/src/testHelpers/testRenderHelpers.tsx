import React from 'react';
import { createGlobalStyle } from 'styled-components';
import type { MountReturn } from '@cypress/react';
import {
    AssistantClientCustomizedCommand,
    AssistantSmartAppData,
    createAssistantHostMock,
} from '@sberdevices/assistant-client';
import { mount } from '@sberdevices/plasma-cy-utils';

import { OnStartFn, PlasmaApp } from '../components/PlasmaApp/PlasmaApp';
import { GetInitialProps, Page } from '../components/Page/Page';
import { PageComponent } from '../components/Page/types';

import image320 from './assets/320_320_0.jpg';

// eslint-disable-next-line import/no-mutable-exports
let mockAssistant: ReturnType<typeof createAssistantHostMock>;

interface OuterProps<T> {
    (props?: T): Partial<T>;
}

/* istanbul ignore next */
export function wrapComponent<T extends React.ComponentType<any>>(
    Component: React.ComponentType<React.ComponentProps<T>>,
    outerProps?: OuterProps<React.ComponentProps<T>> | Partial<React.ComponentProps<T>>,
) {
    const component: React.FC<React.ComponentProps<T> & ReturnType<OuterProps<React.ComponentProps<T>>>> = (props) => {
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

    component.displayName = Component.displayName ?? 'WrappedComponent';

    return component;
}

/* istanbul ignore next */
const appProps = {
    header: {
        title: 'Cypress Test',
    },
    assistantParams: {
        initPhrase: 'запусти тестирование плазма храма',
    },
};

interface SingleScreen<K extends string, S extends { [key in K]: unknown }, P = { [key in K]?: unknown }> {
    name: K;
    component: PageComponent<S, K, P> | React.ComponentType<any>;
    lazy?: boolean;
}

interface StartApp {
    <K extends string, S extends { [key in K]: unknown }, P = { [key in K]?: unknown }>(
        pages: Array<
            SingleScreen<K, S, P> & {
                getInitialProps?: GetInitialProps<any, S[K]>;
            }
        >,
        onStart?: OnStartFn<S, P>,
        commands?: AssistantClientCustomizedCommand<AssistantSmartAppData>[],
    ): Cypress.Chainable<MountReturn>;
}

const defaultCommands: AssistantClientCustomizedCommand<AssistantSmartAppData>[] = [
    {
        type: 'insets',
        insets: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 144,
        },
        // eslint-disable-next-line @typescript-eslint/camelcase
        sdk_meta: {
            mid: String(Date.now()),
            requestId: '-1',
        },
    },
    {
        type: 'character',
        character: {
            id: 'sber',
            name: 'Сбер',
            gender: 'male',
            appeal: 'official',
        },
        // eslint-disable-next-line @typescript-eslint/camelcase
        sdk_meta: {
            mid: String(Date.now()),
            requestId: '-1',
        },
    },
    {
        type: 'theme',
        theme: {
            name: 'dark',
        },
        // eslint-disable-next-line @typescript-eslint/camelcase
        sdk_meta: {
            mid: String(Date.now()),
            requestId: '-1',
        },
    },
];

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
        win.appInitialData = defaultCommands.concat(commands);
        mockAssistant = createAssistantHostMock({ context: win });

        const StyledComp = createGlobalStyle({
            'input:not([type="hidden"])': {
                'caret-color': 'transparent',
            },
        });

        const onStartHandler: OnStartFn = (api) => {
            if (onStart) {
                onStart(api);
                return;
            }

            api.pushScreen(pages[0].name);
        };

        return mount(
            <>
                <StyledComp />
                <PlasmaApp {...appProps} onStart={onStartHandler}>
                    {pagesToRender.map((page) => {
                        return <Page key={page.name} name={page.name} component={page.component} />;
                    })}
                </PlasmaApp>
            </>,
        );
    });
};

function sendAction<T extends Partial<AssistantClientCustomizedCommand<AssistantSmartAppData>>>(command: T) {
    const sendedCommand = {
        ...command,
        // eslint-disable-next-line @typescript-eslint/camelcase
        sdk_meta: {},
    } as AssistantClientCustomizedCommand<AssistantSmartAppData>;

    Cypress.log({
        name: 'receive assistant action',
        message: `type: ${command.type}`,
        consoleProps: () => command,
    });

    return cy.wrap(mockAssistant.receiveCommand(sendedCommand), {
        log: false,
    });
}

export function sendSmartAppData<T extends AssistantSmartAppData['smart_app_data']>(action: T) {
    return sendAction({
        type: 'smart_app_data',
        // eslint-disable-next-line @typescript-eslint/camelcase
        smart_app_data: action,
    });
}

/* istanbul ignore next */
export const createSyntheticEvent = <T extends Element, E extends Event>(event: E): React.SyntheticEvent<T, E> => {
    let isDefaultPrevented = false;
    let isPropagationStopped = false;
    const preventDefault = () => {
        isDefaultPrevented = true;
        event.preventDefault();
    };
    const stopPropagation = () => {
        isPropagationStopped = true;
        event.stopPropagation();
    };
    return {
        nativeEvent: event,
        currentTarget: event.currentTarget as EventTarget & T,
        target: event.target as EventTarget & T,
        bubbles: event.bubbles,
        cancelable: event.cancelable,
        defaultPrevented: event.defaultPrevented,
        eventPhase: event.eventPhase,
        isTrusted: event.isTrusted,
        preventDefault,
        isDefaultPrevented: () => isDefaultPrevented,
        stopPropagation,
        isPropagationStopped: () => isPropagationStopped,
        persist: () => {},
        timeStamp: event.timeStamp,
        type: event.type,
    };
};

/* istanbul ignore next */
export const createEvent = <T extends React.SyntheticEvent<HTMLElement, Event>>(
    target: HTMLElement,
    type: string,
): T => {
    const event = new Event(type, { bubbles: true });
    Object.defineProperty(event, 'target', { writable: false, value: target });

    return createSyntheticEvent(event) as T;
};

/* istanbul ignore next */
function stubImage(originalSrc: string, fixture: string): string {
    let url: URL;

    try {
        url = new URL(originalSrc);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        throw new TypeError(`Invalid url, got ${originalSrc}`);
    }

    const paths = url.pathname.split('/');
    const aliasName = paths[paths.length - 1].split('.')[0];
    const alias = `@${aliasName}`;

    cy.intercept(originalSrc, (req) => {
        req.reply((res) => {
            res.send({ fixture });
        });
    }).as(aliasName);

    return alias;
}

export { mockAssistant, sendAction, stubImage };

export const images = {
    image320,
};
