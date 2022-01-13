import React from 'react';
import { Button } from '@sberdevices/plasma-ui';

import { wrapComponent, startApp } from '../../testHelpers/testRenderHelpers';

import { ErrorPage, ErrorPageProps } from './ErrorPage';

interface State {
    errorPage: null;
}

function renderButtons<T extends React.Ref<HTMLButtonElement>>(ref?: T) {
    return (
        <>
            <Button view="primary" ref={ref} text="Вернуться назад" data-cy="go-back-btn" />
            &nbsp;
            <Button view="warning" text="Закрыть" data-cy="close-btn" />
        </>
    );
}

function initErrorPageTest(props: ErrorPageProps) {
    return startApp<keyof State, State>([
        {
            name: 'errorPage',
            component: wrapComponent(ErrorPage, props),
        },
    ]);
}

describe('ErrorPage', { scrollBehavior: false }, () => {
    afterEach(() => {
        cy.matchImageSnapshot();
    });

    it('render and button focuced', () => {
        initErrorPageTest({
            error: {
                status: 'Что-то пошло не так',
                message: 'Вернитесь на предыдущий экран и повторите попытку',
            },
            buttons: renderButtons,
        }).then(() => {
            cy.get('[data-cy="go-back-btn"]').should('exist').should('be.focused');
        });
    });

    it('render without message and with buttons as ReactNode', () => {
        initErrorPageTest({
            error: {
                status: 'Что-то сломалось :(',
            },
            buttons: renderButtons(),
        }).then(() => {
            cy.get('[data-cy="go-back-btn"]').should('exist').should('not.be.focused');
        });
    });
});
