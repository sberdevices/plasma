import React from 'react';

import { AdditionalDetails, CartOrderDetailsProps, DeliveryPrice, Discount } from './CartOrderDetails@common';

export const CartOrderDetailsMobile: React.FC<CartOrderDetailsProps> = ({
    currency,
    deliveryPrice,
    minDeliveryPrice,
    discount,
    percentDiscount,
    orderDetails,
    className,
}) => {
    return (
        <div className={className}>
            <DeliveryPrice currency={currency} deliveryPrice={deliveryPrice} minDeliveryPrice={minDeliveryPrice} />
            <Discount currency={currency} discount={discount} percentDiscount={percentDiscount} />
            <AdditionalDetails orderDetails={orderDetails} />
        </div>
    );
};
