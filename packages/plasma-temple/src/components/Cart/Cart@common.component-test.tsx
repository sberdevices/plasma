import React from 'react';
import { Button } from '@sberdevices/plasma-ui';

import { startApp } from '../../testHelpers/testRenderHelpers';
import { AnyObject } from '../../types';

import { Cart, CartProps } from './Cart';
import { CartProvider, CartProviderProps } from './CartProvider/CartProvider';
import { EmptyCart } from './EmptyCart/EmptyCart';
import { useCart } from './hooks/useCart';
import { CartItemType, CartState } from './types';

const imageSrc = 'images/img.png';

export const items: CartItemType[] = [
    {
        id: '1',
        name: 'Молоко Parmalat ультрапастеризованное длинное название',
        nameDetails: '1л',
        price: 68,
        oldPrice: 99,
        quantity: 3,
        imageSrc,
        caption: {
            type: 'sale',
            content: '31',
        },
    },
    {
        id: '2',
        name: 'Молоко Parmalat',
        nameDetails: '925мл',
        price: 68,
        quantity: 2,
        quantityLimit: 2,
        imageSrc,
    },
    {
        id: '3',
        label: 'Cubic',
        name: 'CCC 3x3x3 Sail W',
        price: 68,
        quantity: 1,
        imageSrc,
        present: true,
        caption: {
            type: 'present',
        },
    },
];

const defaultState: CartState = {
    items,
    currency: 'rub',
    quantity: 109,
    amount: 408,
    discount: 93,
    percentDiscount: 19,
    deliveryPrice: 100,
};

const dummyFn = () => {};

export function generateWrapper<ID = unknown, T extends AnyObject = AnyObject>(
    passedProps?: Partial<CartProps<ID, T>>,
    passedProviderProps?: Partial<CartProviderProps>,
    cartWrapper?: React.ComponentType,
) {
    const defaultProps: CartProps<ID, T> = {
        defaultItemImage: 'images/placeholder.png',
        onCheckout: dummyFn,
        onImageClick: dummyFn,
    };

    const props = { ...defaultProps, ...passedProps };
    const providerProps = { initialState: defaultState, ...passedProviderProps };

    const CartWrapper = cartWrapper ?? React.Fragment;
    startApp(
        [
            {
                name: 'form',
                component: () => (
                    <CartProvider {...providerProps}>
                        <CartWrapper>
                            <Cart {...props} />
                        </CartWrapper>
                    </CartProvider>
                ),
            },
        ],
        ({ pushScreen }) => pushScreen('form'),
    );

    return providerProps.initialState?.items.length
        ? cy.mockImage('[data-cy="CartItemImage"] > img', 'images/placeholder.png')
        : cy.mockBackgroundImage('[data-cy="EmptyCart-image"] > div', 'images/placeholder.png');
}

describe('Cart', () => {
    let onChangeCartStub;
    let onGoToCatalogStub;

    beforeEach(() => {
        onChangeCartStub = cy.stub();
        onGoToCatalogStub = cy.stub();
    });

    it('render cart', () => {
        generateWrapper();
        cy.matchImageSnapshot();
    });

    it('increase item quantity', () => {
        generateWrapper({}, { onChangeCart: onChangeCartStub });
        cy.get('[data-cy="QuantityButton-plus"]')
            .first()
            .click()
            .then(() => {
                expect(onChangeCartStub).to.be.calledOnce;
            });
        cy.matchImageSnapshot();
    });

    it('decrease item quantity', () => {
        generateWrapper();
        cy.get('[data-cy="QuantityButton-minus"]').first().click();
        cy.matchImageSnapshot();
    });

    it('add item', () => {
        const CartWrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
            const { addItem } = useCart();

            return (
                <>
                    <Button
                        data-cy="add-button"
                        onClick={() => addItem({ id: '4', name: 'New Item', quantity: 1, price: 10000, imageSrc })}
                    >
                        Add item
                    </Button>
                    {children}
                </>
            );
        };

        generateWrapper({}, { onChangeCart: onChangeCartStub }, CartWrapper);

        cy.get('[data-cy="add-button"]')
            .click()
            .then(() => {
                expect(onChangeCartStub).to.be.calledOnce;
            });
        cy.mockImage('[data-cy="CartItemImage"] > img', 'images/placeholder.png');
        cy.matchImageSnapshot();
    });

    it('decrease item quantity to 0', () => {
        const CartWrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
            const { changeItemQuantity } = useCart();

            return (
                <>
                    <Button data-cy="change-quantity-button" onClick={() => changeItemQuantity('1', 0)}>
                        Change Quantity
                    </Button>
                    {children}
                </>
            );
        };

        generateWrapper({}, { onChangeCart: onChangeCartStub }, CartWrapper);

        cy.get('[data-cy="change-quantity-button"]')
            .click()
            .then(() => {
                expect(onChangeCartStub).to.be.calledOnce;
            });
        cy.mockImage('[data-cy="CartItemImage"] > img', 'images/placeholder.png');
        cy.matchImageSnapshot();
    });

    it('remove item', () => {
        const CartWrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
            const { state, removeItem } = useCart();

            return (
                <>
                    <Button data-cy="remove-button" onClick={() => removeItem(state.items[0].id)}>
                        Remove item
                    </Button>
                    {children}
                </>
            );
        };

        generateWrapper({}, { onChangeCart: onChangeCartStub }, CartWrapper);

        cy.get('[data-cy="remove-button"]')
            .click()
            .then(() => {
                expect(onChangeCartStub).to.be.calledOnce;
            });
        cy.mockImage('[data-cy="CartItemImage"] > img', 'images/placeholder.png');
        cy.matchImageSnapshot();
    });

    it('clear cart', () => {
        const CartWrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
            const { clearCart } = useCart();

            return (
                <>
                    <Button data-cy="clear-button" onClick={() => clearCart()}>
                        Clear cart
                    </Button>
                    {children}
                </>
            );
        };

        generateWrapper({ emptyCart: <EmptyCart /> }, { onChangeCart: onChangeCartStub }, CartWrapper);

        cy.get('[data-cy="clear-button"]')
            .click()
            .then(() => {
                expect(onChangeCartStub).to.be.calledOnce;
            });
        cy.mockBackgroundImage('[data-cy="EmptyCart-image"] > div', 'images/placeholder.png');
        cy.matchImageSnapshot();
    });

    describe('empty cart', () => {
        beforeEach(() => {
            generateWrapper(
                { emptyCart: <EmptyCart onGoToCatalog={onGoToCatalogStub} /> },
                { initialState: { items: [], amount: 0, quantity: 0, currency: 'rub' } },
            );
        });

        it('render empty cart', () => {
            cy.matchImageSnapshot();
        });

        it('go to catalog', () => {
            cy.get('[data-cy="EmptyCart-button"]')
                .click()
                .then(() => {
                    expect(onGoToCatalogStub).to.be.calledOnce;
                });
        });
    });
});
