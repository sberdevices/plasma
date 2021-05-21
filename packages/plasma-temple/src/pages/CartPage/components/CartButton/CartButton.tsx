import React from 'react';
import { IconCart } from '@sberdevices/plasma-icons';
import { Button } from '@sberdevices/plasma-ui';

import { AppStateContext } from '../../../../components/PlasmaApp/AppStateContext';

interface CartButtonProps {
    screen: string;
}

export const CartButton: React.FC<CartButtonProps> = ({ screen }) => {
    const { pushScreen } = React.useContext(AppStateContext);
    const onClick = React.useCallback(() => pushScreen(screen, null), [screen, pushScreen]);

    return <Button contentLeft={<IconCart />} text="Корзина" view="clear" size="s" onClick={onClick} />;
};
