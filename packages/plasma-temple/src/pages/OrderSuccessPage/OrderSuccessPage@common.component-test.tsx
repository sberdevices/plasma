import { wrapComponent, startApp, images } from '../../testHelpers/testRenderHelpers';

import { OrderSuccessPage, OrderSuccessProps } from './OrderSuccessPage';

interface State {
    success: null;
}

const header = {
    title: 'Заказ №4657 на 300 ₽',
    subtitle: '20.04 апреля 12:08',
};

let onGoBack: () => void;

function initOrderSuccessPageTest(props?: Partial<OrderSuccessProps>) {
    onGoBack = cy.stub();

    return startApp<keyof State, State>([
        {
            name: 'success',
            component: wrapComponent(OrderSuccessPage, {
                header,
                imageSrc: images.image320,
                onGoBack,
                ...props,
            }),
        },
    ]);
}

describe('OrderSuccessPage', { scrollBehavior: false }, () => {
    it('render', () => {
        initOrderSuccessPageTest()
            .then(() => {
                cy.get('header').should('contain.text', header.title).should('contain.text', header.subtitle);
                cy.get('[data-cy="state-layout-title"]').should(
                    'contain.text',
                    'Заказ успешно оформлен! Статус заказа будет отправлен на E-mail',
                );

                cy.get('[data-cy="order-success-button"]').should('contain.text', 'Вернуться в магазин');
            })
            .then(() => cy.matchImageSnapshot());
    });

    it('render without image', () => {
        initOrderSuccessPageTest({ imageSrc: undefined }).then(() => cy.matchImageSnapshot());
    });

    it('call received function', () => {
        initOrderSuccessPageTest().then(() => {
            cy.get('[data-cy="order-success-button"]')
                .should('be.enabled')
                .click()
                .then(() => {
                    expect(onGoBack).to.be.called;
                });
        });
    });
});
