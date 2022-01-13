import React from 'react';
import { Button, detectDevice } from '@sberdevices/plasma-ui';

import { wrapComponent, startApp } from '../../testHelpers/testRenderHelpers';

import { ErrorPage, ErrorPageProps } from './ErrorPage';

interface State {
    errorPage: null;
}

const buttonProps = () => {
    const props = {
        size: 'm',
        stretch: false,
    };

    switch (detectDevice()) {
        case 'mobile':
            props.stretch = true;
            break;
        case 'sberPortal':
            props.size = 's';
            break;
        default:
    }

    return props;
};

function renderButtons<T extends React.Ref<HTMLButtonElement>>(ref?: T) {
    return (
        <>
            <Button view="primary" ref={ref} text="Назад" data-cy="go-back-btn" {...buttonProps()} />
            &nbsp;
            <Button view="warning" text="Закрыть" data-cy="close-btn" {...buttonProps()} />
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

    it('render', () => {
        initErrorPageTest({
            error: {
                status: 'Что-то пошло не так',
                message: 'Вернитесь на предыдущий экран и повторите попытку',
            },
            buttons: renderButtons,
        }).then(() => {
            cy.get('[data-cy="state-layout-title"]').should('contain.text', 'Что-то пошло не так');
            cy.get('[data-cy="state-layout-text"]').should(
                'contain.text',
                'Вернитесь на предыдущий экран и повторите попытку',
            );
            cy.get('[data-cy="close-btn"]').should('exist');
        });
    });

    it('render without message and with buttons as ReactNode', () => {
        initErrorPageTest({
            error: {
                status: 'Что-то сломалось :(',
            },
            buttons: renderButtons(),
        }).then(() => {
            cy.get('[data-cy="state-layout-title"]').should('contain.text', 'Что-то сломалось :(');
            cy.get('[data-cy="state-layout-text"]').should('not.exist');
            cy.get('[data-cy="close-btn"]').should('exist');
        });
    });

    it('render without any controls', () => {
        initErrorPageTest({
            error: {
                status: 'Что-то сломалось :(',
                message: 'А тут без кнопок',
            },
        }).then(() => {
            cy.get('[data-cy="state-layout-title"]').should('contain.text', 'Что-то сломалось :(');
            cy.get('[data-cy="state-layout-text"]').should('contain.text', 'А тут без кнопок');
            cy.get('[data-cy="go-back-btn"]').should('not.exist');
            cy.get('[data-cy="close-btn"]').should('not.exist');
        });
    });
});
