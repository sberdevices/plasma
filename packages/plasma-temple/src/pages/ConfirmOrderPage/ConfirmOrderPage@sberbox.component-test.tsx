import { wrapComponent, startApp } from '../../testHelpers/testRenderHelpers';

import { ConfirmOrderPage, ConfirmOrderProps } from './ConfirmOrderPage';

interface State {
    confirm: null;
}

type StubFn = () => void;

let onPay: StubFn;
let onChangeRecipient: StubFn;
let onChangeDelivery: StubFn;

const delivery = {
    details: 'До двери, СДЭК',
    amount: 500,
};

const recipient = {
    name: 'Константин Константинов',
    phone: '+7 910 345-87-67',
    email: 'Kostyan3000@gmail.com',
};
const address = {
    title: 'Кутузовский проспект, 32',
    content: 'Квартира 48, подъезд 1, этаж 6, домофон 48',
};

const defaultProps = {
    delivery,
    recipient,
    address,
    amount: 1000,
};

function initConfirmOrderPageTest(props?: Partial<ConfirmOrderProps>) {
    onPay = cy.stub();
    onChangeRecipient = cy.stub();
    onChangeDelivery = cy.stub();

    return startApp<keyof State, State>([
        {
            name: 'confirm',
            component: wrapComponent(ConfirmOrderPage, {
                ...defaultProps,
                ...props,
                onPay,
                onChangeRecipient,
                onChangeDelivery,
            }),
        },
    ]);
}

describe('ConfirmOrderPage', { scrollBehavior: false }, () => {
    it('render', () => {
        initConfirmOrderPageTest({ paymentDisabled: false })
            .then(() => {
                cy.get('[data-cy="confirm-order-payment-button"]').should('be.focused');
            })
            .then(() => {
                cy.matchImageSnapshot();
            });
    });
});
