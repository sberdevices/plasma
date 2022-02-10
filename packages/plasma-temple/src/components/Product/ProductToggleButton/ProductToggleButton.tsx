import React from 'react';
import { Button } from '@sberdevices/plasma-ui';

import { isSberBoxLike } from '../../../utils';

export interface ProductToggleButtonProps {
    expanded: boolean;
    toggle: () => void;
    moreText?: string;
    lessText?: string;
    className?: string;
}

export const ProductToggleButton: React.FC<ProductToggleButtonProps> = ({
    expanded,
    toggle,
    moreText = 'Показать больше',
    lessText = 'Показать меньше',
    className,
}) => (
    <Button
        className={className}
        size={isSberBoxLike() ? 'm' : 's'}
        onClick={toggle}
        data-focusable
        data-name="product-toggle-button"
        tabIndex={0}
    >
        {expanded ? lessText : moreText}
    </Button>
);
