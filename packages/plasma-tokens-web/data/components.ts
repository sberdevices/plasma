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
import { body1, caption } from '@sberdevices/plasma-core/tokens/typography';
import type { DataObject } from '@sberdevices/plasma-tokens-utils';
import deepmerge from 'deepmerge';

export const componentsSizes = {
    outlineSize: '0.125rem',
    button: {
        l: {
            height: '3.5rem',
            paddingY: '1rem',
            paddingX: '1.625rem',
            paddingContentX: '1.625rem',
            paddingStretchX: '1.25rem',
            radius: '0.75rem',
            radiusCircle: '1.75rem',
        },
        m: {
            height: '3rem',
            paddingY: '0.75rem',
            paddingX: '1.375rem',
            paddingContentX: '1.5rem',
            paddingStretchX: '1.25rem',
            radius: '0.5rem',
            radiusCircle: '1.5rem',
        },
        s: {
            height: '2.5rem',
            paddingY: '0.5rem',
            paddingX: '1.125rem',
            paddingContentX: '1.25rem',
            paddingStretchX: '1.25rem',
            radius: '0.5rem',
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
        margin: '1rem',
    },
    input: {
        borderWidth: '1px',
        borderRadius: '0.25rem',
        l: {
            height: '3.5rem',
            paddingY: '1.125rem',
            paddingX: '1rem',
            hasLabelPaddingTop: '1.5rem',
            hasLabelPaddingBottom: '0.375rem',
            hasContentPaddingLeft: '3.125rem',
            hasContentPaddingRight: '3.125rem',
        },
        m: {
            height: '3rem',
            paddingY: '0.75rem',
            paddingX: '1rem',
            hasContentPaddingLeft: '3.125rem',
            hasContentPaddingRight: '3.125rem',
        },
        s: {
            height: '2.5rem',
            paddingY: '0.5rem',
            paddingX: '1rem',
            hasContentPaddingLeft: '3.125rem',
            hasContentPaddingRight: '3.125rem',
        },
    },
    inputLabel: {
        marginTop: '0.3125rem',
    },
};

const componentsTypo = {
    field: body1,
    fieldHelperText: caption,
    input: body1,
    inputLabel: caption,
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
        placeholderColor: tertiary,
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
        label: {
            color: secondary,
        },
        focusPlaceholderColor: tertiary,
    },
};

export const components = deepmerge.all([componentsSizes, componentsTypo, componentsColors]) as DataObject;
