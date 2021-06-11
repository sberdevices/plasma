import React from 'react';
import styled, { css } from 'styled-components';
import { Carousel, CarouselCol, Col, Row } from '@sberdevices/plasma-ui';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';

import { Header } from '../../components';

import { CartItem } from './components/CartItem/CartItem';
import { CartOrder } from './components/CartOrder/CartOrder';
import { useCart } from './hooks/useCart';
import { Order } from './types';
import { useCartAssistantState } from './hooks/useCartAssistantState';

interface CartPageProps<ID = string | number> {
    header?: HeaderProps;
    name?: string;
    emptyCart?: React.ReactElement;
    onMakeOrder: (order: Order<ID>) => void;
}

const StyledCarouselGridWrapper = styled.div`
    height: calc(100vh - 5rem);

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            height: calc(100vh - 4.5rem);
        `,
    )}
`;

const StyledRow = styled(Row)`
    scroll-behavior: smooth;
`;

export const CartPage: React.FC<CartPageProps> = ({ header, name, emptyCart, onMakeOrder }) => {
    const { items, quantity, price, currency, minDeliveryPrice = 0 } = useCart();
    const [currentCartItem, setCurrentCartItem] = React.useState(0);

    const handleMakeOrder = React.useCallback(
        () => onMakeOrder({ items, quantity, price, currency, minDeliveryPrice }),
        [onMakeOrder, items, quantity, price, currency, minDeliveryPrice],
    );

    useCartAssistantState(items, name);

    return (
        <>
            <Header title="Корзина" {...header} />
            {!items.length && emptyCart ? (
                emptyCart
            ) : (
                <Row>
                    <Col sizeXL={6} sizeM={4}>
                        <StyledCarouselGridWrapper>
                            <Carousel
                                axis="y"
                                as={StyledRow}
                                index={currentCartItem}
                                scrollAlign="center"
                                scrollSnapType="mandatory"
                                paddingEnd="50%"
                                tabIndex={-1}
                            >
                                {items.map((item, index) => (
                                    <CarouselCol key={item.id} scrollSnapAlign="center">
                                        <CartItem
                                            index={index}
                                            item={item}
                                            currency={currency}
                                            setActiveIndex={setCurrentCartItem}
                                        />
                                    </CarouselCol>
                                ))}
                            </Carousel>
                        </StyledCarouselGridWrapper>
                    </Col>
                    <Col sizeXL={3.5} offsetXL={2.5} sizeM={2}>
                        <CartOrder
                            price={price}
                            minDeliveryPrice={minDeliveryPrice}
                            currency={currency}
                            disabled={!items.length}
                            onMakeOrder={handleMakeOrder}
                        />
                    </Col>
                </Row>
            )}
        </>
    );
};
