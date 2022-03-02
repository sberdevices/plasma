import { initErrorPageTest, renderButtons } from './ErrorPage@helpers.component-test';

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
