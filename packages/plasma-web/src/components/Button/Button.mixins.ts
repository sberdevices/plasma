import { getButtonSizesMixin, buttonSizes, buttonTypography } from '@sberdevices/plasma-core';

export const applySizes = getButtonSizesMixin(
    {
        l: {
            ...buttonSizes.l,
            squareRadius: '0.75rem',
            sOutlineRadius: '0.875rem',
            circleRadius: '1.75rem',
            cOutlineRadius: '1.875rem',
        },
        m: {
            ...buttonSizes.m,
            squareRadius: '0.5rem',
            sOutlineRadius: '0.625rem',
            circleRadius: '1.5rem',
            cOutlineRadius: '1.625rem',
        },
        s: {
            ...buttonSizes.s,
            squareRadius: '0.5rem',
            sOutlineRadius: '0.625rem',
            circleRadius: '1.25rem',
            cOutlineRadius: '1.375rem',
        },
    },
    buttonTypography,
);
