import { generateWrapper, product, actionButtonProps, recommendations } from './Product@helpers.component-test';
import { ActionButtonSelector } from './ProductActionButton/ProductActionButton';

describe('Product', () => {
    it('render product', () => {
        generateWrapper();
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);
        cy.matchImageSnapshot();
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
        cy.matchImageSnapshot();
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
            cy.matchImageSnapshot();
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

    it('expand details', () => {
        generateWrapper({
            product: { ...product, description: undefined },
        });

        cy.get('[data-cy="Collapse-title"]').scrollIntoView().click();

        cy.matchImageSnapshot();
    });

    it('expand description', () => {
        generateWrapper({
            product: { ...product, details: undefined },
        });

        cy.get('[data-cy="Collapse-title"]').scrollIntoView().click();

        cy.matchImageSnapshot();
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
