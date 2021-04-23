import React from 'react';
import styled, { css } from 'styled-components';
import { TextFieldRoot, TextFieldHelper } from '@sberdevices/plasma-core/components/TextField';
import { syntheticFocus } from '@sberdevices/plasma-core/mixins';
import type { FocusProps } from '@sberdevices/plasma-core/mixins';
import type { InputHTMLAttributes } from '@sberdevices/plasma-core/types';
import type { TextFieldProps } from '@sberdevices/plasma-core/components/TextField';
import { accent, secondary, white, text, tertiary, critical } from '@sberdevices/plasma-tokens-web';
import { IconChevronDown } from '@sberdevices/plasma-icons';

import { SelectDropdown } from './SelectDropdown';
import { SelectList, SelectListProps } from './SelectList';

export interface SelectViewProps
    extends Pick<FocusProps, 'focused'>,
        Pick<SelectListProps, 'items' | 'onItemClick'>,
        Pick<TextFieldProps, 'helperText' | 'status'>,
        Omit<InputHTMLAttributes<HTMLDivElement>, 'value' | 'onChange'>,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    label?: string | number;
}

const StyledRoot = styled(TextFieldRoot)`
    position: relative;

    color: ${secondary};

    user-select: none;
`;
const StyledLabel = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: ${text};
`;
const StyledArrow = styled(IconChevronDown)`
    color: ${secondary};
`;
const StyledPlaceholder = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const StyledLabelWrapper = styled.div<Pick<SelectViewProps, 'disabled' | 'focused' | 'status'>>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 0.5rem 0 1rem;
    width: 100%;
    height: 3rem;

    /* stylelint-disable-next-line number-max-precision */
    border: 0.0625rem solid ${tertiary};
    border-radius: 0.25rem;

    background: ${white};

    cursor: pointer;

    transition: border-color 0.1s ease-in-out;

    ${({ focused }) =>
        syntheticFocus(
            css`
                outline: 0 none;
                border-color: ${accent};

                /* stylelint-disable-next-line selector-nested-pattern */
                ${StyledLabel} {
                    color: ${accent};
                }

                /* stylelint-disable-next-line selector-nested-pattern */
                ${StyledArrow} {
                    color: ${accent};
                }
            `,
            focused,
        )}

    ${({ status }) =>
        status === 'error' &&
        css`
            border-color: ${critical};
        `}

    ${({ disabled }) =>
        disabled &&
        css`
            cursor: not-allowed;
        `}
`;

export const SelectView = React.forwardRef<HTMLDivElement, SelectViewProps>(
    ({ label, placeholder, items, tabIndex, helperText, disabled, focused, status, onItemClick, ...rest }, ref) => {
        const rootRef = React.useRef<HTMLDivElement>(null);
        const [isOpen, setIsOpen] = React.useState(false);
        const handleDocumentClick = React.useCallback((event) => {
            if (rootRef.current && (rootRef.current === event.target || rootRef.current.contains(event.target))) {
                return;
            }
            setIsOpen(false);
        }, []);

        React.useEffect(() => {
            document.addEventListener('click', handleDocumentClick);
            return () => document.removeEventListener('click', handleDocumentClick);
        }, []);

        return (
            <StyledRoot ref={rootRef} disabled={disabled} status={status} {...rest}>
                <StyledLabelWrapper
                    ref={ref}
                    disabled={disabled}
                    focused={focused}
                    status={status}
                    tabIndex={tabIndex}
                    onClick={() => setIsOpen(!disabled ? !isOpen : false)}
                >
                    {label ? <StyledLabel>{label}</StyledLabel> : <StyledPlaceholder>{placeholder}</StyledPlaceholder>}
                    <StyledArrow size="xs" color="unset" />
                </StyledLabelWrapper>
                <SelectDropdown open={isOpen}>
                    <SelectList
                        items={items}
                        onItemClick={(item) => {
                            setIsOpen(!isOpen);
                            onItemClick?.(item);
                        }}
                    />
                </SelectDropdown>
                {helperText && <TextFieldHelper status={status}>{helperText}</TextFieldHelper>}
            </StyledRoot>
        );
    },
);
