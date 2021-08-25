import React from 'react';
import styled from 'styled-components';
import { IconCart } from '@sberdevices/plasma-icons';
import { Badge, Button, Price } from '@sberdevices/plasma-ui';

import { AppStateContext } from '../../../../components/PlasmaApp/AppStateContext';
import { useCart } from '../../hooks';

interface CartButtonProps {
    screen: string;
    withPrice?: boolean;
    label?: string;
    hideEmpty?: boolean;
}

const StyledBadge = styled(Badge)`
    position: absolute;
    left: 0.75rem;
    top: -8px;
`;

const StyledIconCount = styled.div`
    position: relative;
`;

export const CartButton: React.FC<CartButtonProps> = ({ screen, withPrice, label, hideEmpty }) => {
    const { pushScreen } = React.useContext(AppStateContext);
    const { state } = useCart();
    const { quantity, amount, currency, discount = 0 } = state;

    const onClick = React.useCallback(() => pushScreen(screen, null), [screen, pushScreen]);

    if (hideEmpty && !state.items.length) {
        return null;
    }

    return (
        <Button
            contentLeft={
                <StyledIconCount>
                    {quantity > 0 && <StyledBadge text={String(quantity)} size="s" view="primary" circled />}
                    <IconCart />
                </StyledIconCount>
            }
            text={withPrice && amount > 0 ? <Price currency={currency}>{amount - discount}</Price> : label}
            view="clear"
            size="s"
            onClick={onClick}
        />
    );
};
