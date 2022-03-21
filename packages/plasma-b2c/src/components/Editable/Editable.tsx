import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { tertiary, text, background } from '@sberdevices/plasma-core';

import { selectText, clearSelection } from '../../utils';
import * as typography from '../Typography';

enum KeyCodes {
    ENTER = 13,
    ESCAPE = 27,
}

const EditButton = styled.span<{ $isHidden: boolean }>`
    position: relative;
    /* stylelint-disable */
    background: var(
        --plasma-editable-icon-background,
        linear-gradient(270deg, ${background} 70%, rgba(0, 0, 0, 0) 120%)
    );
    /* stylelint-enable */
    padding-left: 1rem;
    color: ${tertiary};
    align-self: stretch;

    ${({ $isHidden }) => ($isHidden ? 'display: none;' : '')}
`;

const StyledContainer = styled.span`
    display: flex;
    align-items: center;
    max-width: 100%;
    cursor: pointer;

    &:hover > ${EditButton} {
        color: ${text};
    }
`;

const extraComponentStyles: React.CSSProperties = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginRight: '-1rem',
    paddingRight: '1rem',
    outline: 'none',
};

type RefElement = HTMLDivElement | HTMLSpanElement;

export interface EditableProps {
    value?: string;
    onChange?: React.FormEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onPaste?: React.ClipboardEventHandler<HTMLDivElement>;
    spellCheck?: 'true' | 'false';
    /**
     * Максимальная длина текста в символах
     */
    maxLength?: number;
    /**
     * Компонент, для которого будет добавлена возможность редактирования
     */
    textComponent: typeof typography[keyof typeof typography];
    /**
     * Иконка справа от текста, для корректной работы hover на иконке нужно добавить свойство color="inherit"
     */
    icon?: React.ReactNode;
}

/**
 * Компонент, добавляющий возможность редактирования к текстовому компоненту
 *
 * Для указания альтернативного фона у иконки справа от текста
 * можно указать css переменную --plasma-editable-icon-background в контейнере элемента
 *
 */
export const Editable: React.FC<EditableProps> = ({
    textComponent,
    value,
    icon,
    maxLength,
    spellCheck = 'false',
    onChange,
    onBlur,
    onPaste,
    ...props
}) => {
    const Component = textComponent;

    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLDivElement>(null);
    const prevValueRef = useRef(value || '');

    const handlePaste = useCallback<React.ClipboardEventHandler<HTMLDivElement>>(
        (e) => {
            if (!inputRef.current) return;
            e.preventDefault();

            const text = e.clipboardData.getData('text/plain').replace(/[\n\r]/gi, '');

            if (document.queryCommandSupported('insertText')) {
                document.execCommand('insertText', false, text);
            } else {
                try {
                    navigator.clipboard.writeText(text);
                } catch {
                    inputRef.current.textContent = text;
                }
            }

            if (onPaste) {
                onPaste(e);
            }
        },
        [onPaste],
    );

    const handleBlur = useCallback<React.FocusEventHandler<HTMLDivElement>>(
        (e) => {
            setIsEditing(false);
            clearSelection();
            if (onBlur) {
                onBlur(e);
            }
        },
        [onBlur],
    );

    const handleFocus = useCallback<React.FocusEventHandler<RefElement>>(() => {
        setIsEditing(true);
        inputRef.current && selectText(inputRef.current);
    }, []);

    const handleEditClick = useCallback(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = useCallback<React.KeyboardEventHandler>(
        (e) => {
            if (e.keyCode === KeyCodes.ENTER || e.keyCode === KeyCodes.ESCAPE) {
                inputRef.current?.blur();
            }
        },
        [maxLength],
    );

    const handleChange = useCallback<React.FormEventHandler<HTMLDivElement>>(
        (e) => {
            if (!inputRef.current) return;

            const contentLength = inputRef.current.textContent?.length || 0;

            if (!maxLength || contentLength <= maxLength) {
                prevValueRef.current = inputRef.current.textContent || '';
                onChange && onChange(e);
            } else {
                inputRef.current.textContent = prevValueRef.current;
            }
        },
        [onChange],
    );

    useEffect(() => {
        if (!inputRef.current) return;
        if (typeof value === 'undefined') return;
        if (value === inputRef.current.textContent) return;
        inputRef.current.textContent = value;
    }, [value, textComponent]);

    return (
        <StyledContainer {...props}>
            <Component
                ref={inputRef}
                style={extraComponentStyles}
                role="textbox"
                spellCheck={spellCheck}
                contentEditable
                onPaste={handlePaste}
                onInput={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
            />
            <EditButton onClick={handleEditClick} $isHidden={isEditing}>
                {icon}
            </EditButton>
        </StyledContainer>
    );
};
