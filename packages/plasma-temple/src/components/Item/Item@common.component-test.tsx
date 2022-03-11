import { isSberBoxLike } from '../../utils';

import { generateWrapper } from './Item@helpers.component-test';

const matchImageSnapshot = (pause?: boolean) => {
    if (isSberBoxLike() || pause) {
        // Ждем фокуса кнопки
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500).then(() => {
            cy.matchImageSnapshot();
        });
    } else {
        cy.matchImageSnapshot();
    }
};

describe('Item', () => {
    it('render item', () => {
        generateWrapper();
        matchImageSnapshot();
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

    it('render item with entities carousel', () => {
        generateWrapper({
            entitiesView: 'carousel',
        });
        matchImageSnapshot(true);
    });

    it('render without background', () => {
        generateWrapper({
            background: null,
        });
        matchImageSnapshot();
    });
});
