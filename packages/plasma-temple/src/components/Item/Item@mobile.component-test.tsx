import { generateWrapper } from './Item@helpers.component-test';

describe('Item', () => {
    it('render item', () => {
        generateWrapper();
        cy.matchImageSnapshot();
    });

    it('click on action button', () => {
        const onActionButtonClickStub = cy.stub();
        generateWrapper({
            actionButtonProps: { actionButtonText: 'Начать аудиотур', onActionButtonClick: onActionButtonClickStub },
        });
        cy.get('[data-cy="ItemMainSection-button"]')
            .click()
            .then(() => {
                expect(onActionButtonClickStub).to.be.calledOnce;
            });
    });

    it('render without background', () => {
        generateWrapper({
            background: null,
        });
        cy.matchImageSnapshot();
    });
});
