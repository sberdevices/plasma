import React, { forwardRef, useState, useMemo, createRef } from 'react';
import styled from 'styled-components';
import {
    FieldRoot,
    FieldContent,
    FieldHelper,
    TextArea as BaseArea,
    useResizeObserver,
} from '@sberdevices/plasma-core';
import type { TextAreaProps as BaseProps } from '@sberdevices/plasma-core';

import { applyInputStyles } from '../Field';

export interface TextAreaProps extends BaseProps {
    /**
     * Слот для вспомогательного блока снизу.
     */
    helperBlock?: React.ReactElement;
}

const StyledTextArea = styled(BaseArea)`
    ${applyInputStyles}
`;

const StyledFieldHelperWrapper = styled.div<{ width: number }>`
    position: absolute;
    top: 0;

    display: flex;
    justify-content: flex-end;

    width: ${({ width }) => width}px;
`;

/**
 * Поле ввода многострочного текста.
 */
// eslint-disable-next-line prefer-arrow-callback
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
    { id, disabled, status, label, placeholder, contentRight, helperText, style, className, ...rest },
    outerRef,
) {
    const [width, setWidth] = useState(0);
    const ref = useMemo(() => (outerRef && 'current' in outerRef ? outerRef : createRef<HTMLTextAreaElement>()), [
        outerRef,
    ]);

    useResizeObserver(ref, (currentElement) => {
        const { width: elementWidth } = currentElement.getBoundingClientRect();

        setWidth(elementWidth);
    });

    const placeLabel = (label || placeholder) as string | undefined;

    return (
        <FieldRoot
            $disabled={disabled}
            $isContentRight={Boolean(contentRight)}
            $isHelper={Boolean(helperText)}
            status={status}
            style={style}
            className={className}
        >
            <StyledTextArea
                ref={ref}
                id={id}
                placeholder={placeLabel}
                disabled={disabled}
                status={status}
                aria-describedby={id ? `${id}-helpertext` : undefined}
                {...rest}
            />
            {helperText && <FieldHelper id={id ? `${id}-helpertext` : undefined}>{helperText}</FieldHelper>}
            <StyledFieldHelperWrapper width={width}>
                {contentRight && <FieldContent pos="right">{contentRight}</FieldContent>}
            </StyledFieldHelperWrapper>
        </FieldRoot>
    );
});
