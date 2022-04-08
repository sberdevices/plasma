import React from 'react';
import styled, { css } from 'styled-components';
import { Col, mediaQuery, Row } from '@sberdevices/plasma-ui';

import { AnyObject, Insets } from '../../types';
import { UnifiedComponentProps } from '../../registry/types';

import { useCart } from './hooks/useCart';
import { CartItemProps } from './CartItem/CartItem';
import { CartItemType, CartState } from './types';
import { CartOrderProps } from './CartOrder/CartOrder@common';
import { CartItemListProps } from './CartItemList/CartItemList@common';

type PlatformComponents<ID = unknown, T extends AnyObject = AnyObject> = {
    CartItemList: CartItemListProps<ID, T>;
    CartOrder: CartOrderProps<ID, T>;
};

export interface CartProps<ID = unknown, T extends AnyObject = AnyObject> {
    /** Контент для отображения пустой корзины */
    emptyCart?: React.ReactNode;
    /**
     * Отступы вокруг корзины, на текущий момент используется только отступ снизу,
     * для позиционирования кнопки в мобильной версии
     */
    insets?: Partial<Insets>;
    /**
     * Дефолтное изображение для отдельной позиции в корзине.
     * Используется при отсутствии изображения у элемента корзины или при ошибке загрузки изображения
     */
    defaultItemImage?: string;
    /** Недоступность кнопки оформления заказа */
    checkoutDisabled?: boolean;
    /** Кастомный компонент отдельной позиции в корзине */
    cartItemComponent?: React.ComponentType<CartItemProps<ID, T>>;
    /** Кастомный компонент информации о заказе в корзине */
    cartOrderComponent?: React.ComponentType<CartOrderProps<ID, T>>;
    /** Кастомный контент кнопки `Оформить заказ` */
    checkoutButtonContent?: React.ReactNode;
    /** Контент дополнительной информации */
    additionalInfo?: React.ReactNode;
    /** Дополнительня стилизация контейнера корзины */
    className?: string;
    /** Колбэк вызываемый при клике по кнопке `Оформить заказ` */
    onCheckout: (cartState: CartState<ID, T>) => void;
    /** Колбэк вызываемый при клике по изображению конкретной позиции в корзине */
    onImageClick?: (item: CartItemType<ID, T>) => void;
}

export type CartComponent = <ID = unknown, T extends AnyObject = AnyObject>(
    props: CartProps<ID, T>,
) => React.ReactElement;

const StyledContainer = styled.div<Partial<Insets>>`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const StyledRow = styled(Row)`
    height: 100%;
`;

const StyledCol = styled(Col)`
    height: 100%;

    ${mediaQuery(
        'S',
        1,
    )(css`
        height: auto;
    `)}
`;

export function CartCommon<ID = unknown, T extends AnyObject = AnyObject>({
    emptyCart,
    insets,
    defaultItemImage,
    checkoutDisabled,
    cartItemComponent,
    cartOrderComponent,
    checkoutButtonContent,
    additionalInfo,
    className,
    onCheckout,
    onImageClick,
    platformComponents: { CartItemList, CartOrder },
}: UnifiedComponentProps<CartProps<ID, T>, PlatformComponents<ID, T>>): React.ReactElement {
    const { state, changeItemQuantity, removeItem } = useCart<CartState<ID, T>>();
    const { items, currency, quantity, quantityLimit } = state;

    const handleCheckout = React.useCallback(() => onCheckout(state), [onCheckout, state]);
    const onPlus = React.useCallback(
        (item: T['items'][number]) => {
            changeItemQuantity(item.id, item.quantity + 1);
        },
        [changeItemQuantity],
    );

    const onMinus = React.useCallback(
        (item: T['items'][number]) => {
            if (item.quantity <= 0) {
                removeItem(item.id);
            } else {
                changeItemQuantity(item.id, item.quantity - 1);
            }
        },
        [changeItemQuantity, removeItem],
    );

    const onRemove = React.useCallback(
        (item: T['items'][number]) => {
            removeItem(item.id);
        },
        [removeItem],
    );

    const CartOrderComponent = cartOrderComponent ?? CartOrder;

    return (
        <StyledContainer className={className} bottom={insets?.bottom} top={insets?.top}>
            {!items.length && emptyCart ? (
                emptyCart
            ) : (
                <StyledRow>
                    <StyledCol sizeXL={6} sizeL={6} sizeM={4} sizeS={4} data-cy="CartPage-items">
                        <CartItemList
                            items={items}
                            currency={currency}
                            maxCount={Boolean(quantityLimit && quantity >= quantityLimit)}
                            defaultItemImage={defaultItemImage}
                            cartItemComponent={cartItemComponent}
                            onImageClick={onImageClick}
                            onPlus={onPlus}
                            onMinus={onMinus}
                            onRemove={onRemove}
                        />
                    </StyledCol>
                    <StyledCol sizeXL={4} offsetXL={2} sizeM={2} sizeS={4} data-cy="CartPage-order">
                        <CartOrderComponent
                            order={state}
                            disabled={!items.length || checkoutDisabled}
                            checkoutButtonContent={checkoutButtonContent}
                            additionalInfo={additionalInfo}
                            insets={insets}
                            onCheckout={handleCheckout}
                        />
                    </StyledCol>
                </StyledRow>
            )}
        </StyledContainer>
    );
}
