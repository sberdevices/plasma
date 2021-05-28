import React from 'react';
import styled from 'styled-components';
import { IconCart } from '@sberdevices/plasma-icons';
import { Badge, Button, Price } from '@sberdevices/plasma-ui';

import { AppStateContext } from '../../../../components/PlasmaApp/AppStateContext';
import { useCart } from '../../hooks';

interface CartButtonProps {
    screen: string;
    withPrice?: boolean;
}

const StyledBadge = styled(Badge)`
    position: absolute;
    left: 0.75rem;
    top: -8px;
`;

const StyledIconCount = styled.div`
    position: relative;
`;

export const CartButton: React.FC<CartButtonProps> = ({ screen, withPrice }) => {
    const { pushScreen } = React.useContext(AppStateContext);
    const { items, currency } = useCart();

    const onClick = React.useCallback(() => pushScreen(screen, null), [screen, pushScreen]);

    const { count, price } = items.reduce(
        (acc, item) => ({ count: acc.count + item.quantity, price: acc.price + item.price * item.quantity }),
        { count: 0, price: 0 },
    );

    return (
        <Button
            contentLeft={
                <StyledIconCount>
                    {count > 0 && <StyledBadge text={String(count)} size="s" view="primary" circled />}
                    <IconCart />
                </StyledIconCount>
            }
            text={withPrice && price > 0 ? <Price currency={currency}>{price}</Price> : 'Корзина'}
            view="clear"
            size="s"
            onClick={onClick}
        />
    );
};
