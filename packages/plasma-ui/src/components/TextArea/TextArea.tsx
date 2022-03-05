import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { FieldRoot, FieldContent, TextArea as BaseArea } from '@sberdevices/plasma-core';
import type { TextAreaProps as BaseProps } from '@sberdevices/plasma-core';

import { FieldHelper, applyInputStyles } from '../Field';

export interface TextAreaProps extends BaseProps {}

const StyledTextArea = styled(BaseArea)`
    ${applyInputStyles}

    border-radius: 1rem;
`;

/**
 * Поле ввода многострочного текста.
 */
// eslint-disable-next-line prefer-arrow-callback
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
    { id, disabled, status, label, placeholder, contentRight, helperText, style, className, ...rest },
    ref,
) {
    const placeLabel = (label || placeholder) as string | undefined;

    return (
        <FieldRoot
            $disabled={disabled}
            $isContentRight={Boolean(contentRight)}
            $isHelper={Boolean(helperText)}
            status={status}
            style={style}
            className={className}
            aria-describedby={id ? `${id}-helpertext` : undefined}
        >
            <StyledTextArea ref={ref} id={id} placeholder={placeLabel} disabled={disabled} status={status} {...rest} />
            {contentRight && <FieldContent pos="right">{contentRight}</FieldContent>}
            {helperText && <FieldHelper id={id ? `${id}-helpertext` : undefined}>{helperText}</FieldHelper>}
        </FieldRoot>
    );
});
