import React from 'react';
import { createAssistantHostMock } from '@sberdevices/assistant-client';
import { mount } from '@sberdevices/plasma-cy-utils';
import { MountReturn } from '@cypress/react';

import { OnStartFn, PlasmaApp } from '../components/PlasmaApp/PlasmaApp';
import { Page } from '../components/Page/Page';
import { PageComponent } from '../components/Page/types';

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

interface SingleScreen<K extends string, S extends { [key in K]: unknown }, P = { [key in K]?: unknown }> {
    name: K;
    component: PageComponent<S, K, P>;
}

interface StartApp {
    <K extends string, S extends { [key in K]: unknown }, P = { [key in K]?: unknown }>(
        pages: Array<SingleScreen<K, S, P>>,
        onStart: OnStartFn<S, P>,
    ): Cypress.Chainable<MountReturn>;
}

export const startApp: StartApp = (pages, onStart) =>
    cy.window().then((win) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        win.appInitialData = [];
        createAssistantHostMock({ context: win });

        return mount(
            <PlasmaApp {...appProps} onStart={onStart}>
                {pages.map((page) => {
                    return <Page key={page.name} name={page.name} component={page.component} />;
                })}
            </PlasmaApp>,
        );
    });
