import {
    accent,
    primary,
    secondary,
    tertiary,
    success,
    warning,
    critical,
    background,
} from '@sberdevices/plasma-core/tokens/colors';
import { bodyM, bodyXS } from '@sberdevices/plasma-typo/lib/cjs/tokens';
import type { DataObject } from '@sberdevices/plasma-tokens-utils';
import deepmerge from 'deepmerge';

const componentsSizes = {
    outlineSize: '0.0625rem',
    button: {
        l: {
            height: '3.5rem',
            paddingY: '1rem',
            paddingX: '1.625rem',
            paddingContentX: '1.625rem',
            paddingStretchX: '1.25rem',
            radius: '1rem',
            radiusCircle: '2rem',
        },
        m: {
            height: '3rem',
            paddingY: '0.75rem',
            paddingX: '1.375rem',
            paddingContentX: '1.5rem',
            paddingStretchX: '1.25rem',
            radius: '0.75rem',
            radiusCircle: '2rem',
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
        marginBottom: '0.5rem',
    },
    fieldContent: {
        margin: '0.75rem',
    },
    input: {
        borderWidth: '1px',
        borderRadius: '0.5rem',
        l: {
            height: '3rem',
            paddingY: '0.75rem',
            paddingX: '1rem',
            hasLabelPaddingTop: '1.1875rem',
            hasLabelPaddingBottom: '0.3125rem',
            hasContentPaddingLeft: '2.5rem',
            hasContentPaddingRight: '2.5rem',
        },
        m: {
            height: '2.5rem',
            paddingY: '0.5rem',
            paddingX: '1rem',
            hasContentPaddingLeft: '2.5rem',
            hasContentPaddingRight: '2.5rem',
        },
        s: {
            height: '2rem',
            paddingY: '0.25rem',
            paddingX: '1rem',
            hasContentPaddingLeft: '2.5rem',
            hasContentPaddingRight: '2.5rem',
        },
    },
    inputLabel: {
        marginTop: '0.3125rem',
    },
};

const componentsTypo = {
    field: bodyM,
    fieldHelperText: bodyXS,
    input: bodyM,
    inputLabel: bodyXS,
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
        backgroundColor: background,
        color: primary,
        caretColor: accent,
        placeholderColor: secondary,
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
            backgroundColor: background,
            color: primary,
            borderColor: critical,
        },
        focusPlaceholderColor: tertiary,
    },
    inputLabel: {
        color: secondary,
    },
};

export const components = deepmerge.all([componentsSizes, componentsTypo, componentsColors]) as DataObject;
