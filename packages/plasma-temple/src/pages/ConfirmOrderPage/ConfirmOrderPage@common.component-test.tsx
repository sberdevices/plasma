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

const currencyFormat = (value: number) => {
    return new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: 'rub',
        minimumFractionDigits: 0,
    }).format(value);
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
                cy.get('[data-cy="confirm-order-card"]').first().should('contain.text', 'До двери, СДЭК');
                cy.get('[data-cy="confirm-order-card"]')
                    .first()
                    .should('contain.text', `${currencyFormat(delivery.amount)}`);
                cy.get('[data-cy="confirm-order-payment-button"]').should(
                    'contain.text',
                    `К оплате${currencyFormat(defaultProps.amount)}`,
                );

                cy.get('[data-cy="confirm-order-location"]')
                    .should('contain.text', recipient.phone)
                    .should('contain.text', address.title)
                    .should('contain.text', address.content);
            })
            .then(() => {
                cy.matchImageSnapshot();
            });
    });

    it('render with disabled payment button', () => {
        initConfirmOrderPageTest({ paymentDisabled: true })
            .then(() => {
                cy.get('[data-cy="confirm-order-payment-button"]')
                    .should('be.disabled')
                    .should('contain.text', `К оплате${currencyFormat(defaultProps.amount)}`);
            })
            .then(() => {
                cy.matchImageSnapshot();
            });
    });

    it('call received functions', () => {
        initConfirmOrderPageTest({ paymentDisabled: false }).then(() => {
            cy.get('[data-cy="confirm-order-card"]')
                .first()
                .click()
                .then(() => {
                    expect(onChangeDelivery).to.be.called;
                });
            cy.get('[data-cy="confirm-order-card"]')
                .last()
                .click()
                .then(() => {
                    expect(onChangeRecipient).to.be.called;
                });

            cy.get('[data-cy="confirm-order-payment-button"]')
                .should('be.enabled')
                .click()
                .then(() => {
                    expect(onPay).to.be.called;
                });
        });
    });
});
