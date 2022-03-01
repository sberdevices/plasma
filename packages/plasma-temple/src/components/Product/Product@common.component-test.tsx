import { isSberBoxLike } from '../../utils';

import { generateWrapper, product, actionButtonProps, recommendations } from './Product@helpers.component-test';
import { ActionButtonSelector } from './ProductActionButton/ProductActionButton';

const matchImageSnapshot = () => {
    if (isSberBoxLike()) {
        // Ждем фокуса кнопки
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500).then(() => {
            cy.matchImageSnapshot();
        });
    } else {
        cy.matchImageSnapshot();
    }
};

describe('Product', () => {
    it('render product', () => {
        generateWrapper();
        matchImageSnapshot();
    });

    it('render short content (not expanded)', () => {
        generateWrapper({
            product: {
                ...product,
                shortDetails: undefined,
                details: { ...product.details, values: product.details.values.slice(0, 2) },
                description: { ...product.description, content: 'Короткое описание' },
            },
            variations: undefined,
        });
        matchImageSnapshot();
    });

    it('render recommendations', () => {
        generateWrapper({
            product: {
                ...product,
                details: undefined,
                shortDetails: undefined,
                description: { ...product.description, content: 'Короткое описание' },
            },
            variations: undefined,
        });
        matchImageSnapshot();
    });

    it('click on action button', () => {
        const onClickStub = cy.stub();
        generateWrapper({
            actionButtonProps: { ...actionButtonProps, onClick: onClickStub },
        });
        cy.get(`[data-name="${ActionButtonSelector.ActionButton}"]`)
            .click()
            .then(() => {
                expect(onClickStub).to.be.calledOnce;
            });
    });

    describe('action button with quantity', () => {
        let onChangeQuantityStub;

        beforeEach(() => {
            onChangeQuantityStub = cy.stub();

            generateWrapper({
                actionButtonProps: {
                    ...actionButtonProps,
                    withQuantity: true,
                    quantity: 1,
                    onChangeQuantity: onChangeQuantityStub,
                },
            });
        });

        it('render action button with quantity', () => {
            matchImageSnapshot();
        });

        it('click minus action button', () => {
            cy.get(`[data-name="${ActionButtonSelector.MinusButton}"]`)
                .click()
                .then(() => {
                    expect(onChangeQuantityStub).to.be.calledOnceWith(-1);
                });
        });

        it('click plus action button', () => {
            cy.get(`[data-name="${ActionButtonSelector.PlusButton}"]`)
                .click()
                .then(() => {
                    expect(onChangeQuantityStub).to.be.calledOnceWith(1);
                });
        });
    });

    it('click on variation button', () => {
        const onChangeVariationStub = cy.stub();

        generateWrapper({
            onChangeVariation: onChangeVariationStub,
        });

        cy.get('[data-cy="ProductVariationItem-button"]')
            .first()
            .click()
            .then(() => {
                expect(onChangeVariationStub).to.be.calledOnce;
            });
    });

    it('click on more button details', () => {
        generateWrapper({
            product: { ...product, description: undefined },
        });

        cy.get('[data-cy="ProductToggleButton"]').scrollIntoView().click();

        matchImageSnapshot();
    });

    it('click on more button description', () => {
        generateWrapper({
            product: { ...product, details: undefined },
        });

        cy.get('[data-cy="ProductToggleButton"]').scrollIntoView().click();

        matchImageSnapshot();
    });

    it('click on recommendation', () => {
        const onClickRecommendationStub = cy.stub();

        generateWrapper({
            onClickRecommendation: onClickRecommendationStub,
            product: { ...product, description: undefined, details: undefined, shortDetails: undefined },
        });

        cy.get('[data-cy="ProductRecommendationsItem"]')
            .first()
            .scrollIntoView()
            .click()
            .then(() => {
                expect(onClickRecommendationStub).to.be.calledOnceWith(recommendations.items[0], 0);
            });
    });
});
