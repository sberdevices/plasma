import React from 'react';

import { AppStateContext } from '../../../../components/PlasmaApp/AppStateContext';
import { CartHeaderButton } from '../../../../components/Cart/CartHeaderButton/CartHeaderButton';
import { useCart } from '../../../../components/Cart/hooks/useCart';

interface CartButtonProps {
    screen: string;
    withPrice?: boolean;
    label?: string;
    hideEmpty?: boolean;
}

/**
 * @deprecated instead use CartHeaderButton
 */
export const CartButton: React.FC<CartButtonProps> = ({ screen, withPrice, label, hideEmpty }) => {
    const { pushScreen } = React.useContext(AppStateContext);
    const { state } = useCart();
    const { quantity, amount, currency } = state;

    const onClick = React.useCallback(() => pushScreen(screen, null), [screen, pushScreen]);

    if (hideEmpty && !state.items.length) {
        return null;
    }

    return (
        <CartHeaderButton
            amount={amount}
            quantity={quantity}
            currency={currency}
            withPrice={withPrice}
            label={label}
            hideEmpty={hideEmpty}
            onClick={onClick}
        />
    );
};
