import React from 'react';

import { Header } from '../../components';
import { ComponentPropsWithHeader } from '../../components/Header/types';
import { Cart, CartProps } from '../../components/Cart/Cart';
import { useInsets } from '../../hooks';
import { CartState } from '../../components/Cart/types';

interface CartPageProps<T extends CartState> extends ComponentPropsWithHeader {
    name?: string;
    emptyCart?: React.ReactElement;
    orderButtonText?: string;
    onMakeOrder: (cartState: T) => void;
    onItemClick?: (item: T['items'][number]) => void;
}

/**
 * @deprecated instead use Cart
 */
export function CartPage<T extends CartState = CartState>({
    header,
    emptyCart,
    orderButtonText,
    onMakeOrder,
    onItemClick,
    children,
}: React.PropsWithChildren<CartPageProps<T>>): React.ReactElement {
    const insets = useInsets();

    return (
        <>
            {header && <Header title="Корзина" {...header} />}
            <Cart
                emptyCart={emptyCart}
                insets={insets}
                checkoutButtonContent={orderButtonText}
                additionalInfo={children}
                onCheckout={onMakeOrder as CartProps['onCheckout']}
                onImageClick={onItemClick}
            />
        </>
    );
}
