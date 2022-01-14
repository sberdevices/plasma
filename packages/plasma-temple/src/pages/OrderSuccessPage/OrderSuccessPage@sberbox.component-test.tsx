import { wrapComponent, startApp, images } from '../../testHelpers/testRenderHelpers';

import { OrderSuccessPage, OrderSuccessProps } from './OrderSuccessPage';

interface State {
    success: null;
}

const header = {
    title: 'Заказ №4657 на 300 ₽',
    subtitle: '20.04 апреля 12:08',
};

function initOrderSuccessPageTest(props?: Partial<OrderSuccessProps>) {
    return startApp<keyof State, State>([
        {
            name: 'success',
            component: wrapComponent(OrderSuccessPage, {
                header,
                imageSrc: images.image320,
                onGoBack: () => {},
                ...props,
            }),
        },
    ]);
}

describe('OrderSuccessPage', { scrollBehavior: false }, () => {
    it('button should be focused', () => {
        initOrderSuccessPageTest().then(() => {
            cy.get('[data-cy="order-success-button"]').should('be.focused');
        });
    });
});
