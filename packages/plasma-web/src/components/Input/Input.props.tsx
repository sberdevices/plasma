import { css } from 'styled-components';

import {
    inputBorderWidth,
    inputSuccessBackground,
    inputSuccessColor,
    inputSuccessCaretColor,
    inputSuccessBorderColor,
    inputWarningBackground,
    inputWarningColor,
    inputWarningCaretColor,
    inputWarningBorderColor,
    inputErrorBackground,
    inputErrorColor,
    inputErrorCaretColor,
    inputErrorBorderColor,
} from '../../tokens';

export const sizes = {
    l: {
        height: 'var(--plasma-input-l-height)',
        paddingY: 'var(--plasma-input-l-padding-y)',
        paddingX: 'var(--plasma-input-l-padding-x)',
        hasLabelPaddingTop: 'var(--plasma-input-l-has-label-padding-top)',
        hasLabelPaddingBottom: 'var(--plasma-input-l-has-label-padding-bottom)',
        hasContentPaddingLeft: 'var(--plasma-input-l-has-content-padding-left)',
        hasContentPaddingRight: 'var(--plasma-input-l-has-content-padding-right)',
    },
    m: {
        height: 'var(--plasma-input-m-height)',
        paddingY: 'var(--plasma-input-m-padding-y)',
        paddingX: 'var(--plasma-input-m-padding-x)',
        hasLabelPaddingTop: 'var(--plasma-input-m-padding-y)',
        hasLabelPaddingBottom: 'var(--plasma-input-m-padding-y)',
        hasContentPaddingLeft: 'var(--plasma-input-m-has-content-padding-left)',
        hasContentPaddingRight: 'var(--plasma-input-m-has-content-padding-right)',
    },
    s: {
        height: 'var(--plasma-input-s-height)',
        paddingY: 'var(--plasma-input-s-padding-y)',
        paddingX: 'var(--plasma-input-s-padding-x)',
        hasLabelPaddingTop: 'var(--plasma-input-s-padding-y)',
        hasLabelPaddingBottom: 'var(--plasma-input-s-padding-y)',
        hasContentPaddingLeft: 'var(--plasma-input-s-has-content-padding-left)',
        hasContentPaddingRight: 'var(--plasma-input-s-has-content-padding-right)',
    },
};

export const statuses = {
    success: css`
        &,
        &:hover,
        &:focus,
        &:hover:focus {
            background-color: ${inputSuccessBackground};
            color: ${inputSuccessColor};
            caret-color: ${inputSuccessCaretColor};
            box-shadow: inset 0 0 0 ${inputBorderWidth} ${inputSuccessBorderColor};
        }
    `,
    warning: css`
        &,
        &:hover,
        &:focus,
        &:hover:focus {
            background-color: ${inputWarningBackground};
            color: ${inputWarningColor};
            caret-color: ${inputWarningCaretColor};
            box-shadow: inset 0 0 0 ${inputBorderWidth} ${inputWarningBorderColor};
        }
    `,
    error: css`
        &,
        &:hover,
        &:focus,
        &:hover:focus {
            background-color: ${inputErrorBackground};
            color: ${inputErrorColor};
            caret-color: ${inputErrorCaretColor};
            box-shadow: inset 0 0 0 ${inputBorderWidth} ${inputErrorBorderColor};
        }
    `,
};
