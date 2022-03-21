import {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    critical,
    surfaceLiquid01,
    surfaceLiquid02,
    background,
} from '@sberdevices/plasma-core/tokens/colors';
import { bodySBold, bodyXXSBold, textXSBold } from '@sberdevices/plasma-typo/lib/cjs/tokens';
import type { DataObject } from '@sberdevices/plasma-tokens-utils';
import deepmerge from 'deepmerge';

const componentsSizes = {
    outlineSize: '0.125rem',
    button: {
        l: {
            height: '3.5rem',
            paddingY: '1rem',
            paddingX: '1.625rem',
            paddingContentX: '1.625rem',
            paddingStretchX: '1.25rem',
            radius: '1rem',
            radiusCircle: '1.75rem',
        },
        m: {
            height: '3rem',
            paddingY: '0.75rem',
            paddingX: '1.375rem',
            paddingContentX: '1.5rem',
            paddingStretchX: '1.25rem',
            radius: '0.75rem',
            radiusCircle: '1.5rem',
        },
        s: {
            height: '2.5rem',
            paddingY: '0.5rem',
            paddingX: '1.125rem',
            paddingContentX: '1.25rem',
            paddingStretchX: '1.25rem',
            radius: '0.75rem',
            radiusCircle: '1.25rem',
        },
    },
    fieldHelperText: {
        marginTop: '0.25rem',
    },
    fieldLabel: {
        marginBottom: '0.75rem',
    },
    fieldContent: {
        margin: '1rem',
    },
    input: {
        borderWidth: '1px',
        borderRadius: '0.75rem',
        l: {
            height: '3rem',
            paddingY: '0.75rem',
            paddingX: '1rem',
            hasLabelPaddingTop: '1.4375rem',
            hasLabelPaddingBottom: '0.4375rem',
            hasContentPaddingLeft: '3.25rem',
            hasContentPaddingRight: '3.25rem',
        },
        m: {
            height: '2.5rem',
            paddingY: '0.5rem',
            paddingX: '1rem',
            hasContentPaddingLeft: '3.25rem',
            hasContentPaddingRight: '3.25rem',
        },
        s: {
            height: '2rem',
            paddingY: '0.25rem',
            paddingX: '1rem',
            hasContentPaddingLeft: '3.25rem',
            hasContentPaddingRight: '3.25rem',
        },
    },
    inputLabel: {
        marginTop: '0.4375rem',
    },
};

const componentsTypo = {
    field: bodySBold,
    fieldHelperText: textXSBold,
    input: bodySBold,
    inputLabel: bodyXXSBold,
};

const componentsColors = {
    field: {
        color: secondary,
        success: {
            color: success,
        },
        warning: {
            color: warning,
        },
        error: {
            color: critical,
        },
    },
    fieldLabel: {
        color: primary,
    },
    input: {
        backgroundColor: surfaceLiquid01,
        color: primary,
        caretColor: primary,
        placeholderColor: secondary,
        hover: {
            backgroundColor: surfaceLiquid02,
        },
        focus: {
            backgroundColor: surfaceLiquid02,
        },
        success: {
            backgroundColor: background,
            color: primary,
            borderColor: success,
        },
        warning: {
            backgroundColor: background,
            color: primary,
            borderColor: warning,
        },
        error: {
            backgroundColor: 'var(--plasma-colors-input-error-background)',
            color: critical,
            borderColor: 'var(--plasma-colors-input-error-border)',
        },
        focusPlaceholderColor: tertiary,
    },
    inputLabel: {
        color: tertiary,
    },
};

export const components = deepmerge.all([componentsSizes, componentsTypo, componentsColors]) as DataObject;
