import React, { useMemo } from 'react';
import styled, { StyledComponent } from 'styled-components';
import { Body1, Caption, Footnote1 } from '@sberdevices/plasma-ui';
import { secondary, warning } from '@sberdevices/plasma-tokens';

import { ValidationMessage, ValidityStateKeys } from '../types';
import { GetStyledComponentProps } from '../../../types';

type Align = 'left' | 'center' | 'right';

const StyledLabel = styled(Body1)<Record<'align', Align>>`
    display: block;
    width: 100%;

    margin-bottom: 16px;

    white-space: nowrap;

    color: ${secondary};
    text-align: ${(props) => props.align};
`;

const StyledFieldControl = styled.div`
    display: flex;

    flex-direction: row;
    justify-content: center;
    align-items: center;

    flex: 1;
    width: 100%;

    margin-bottom: 16px;
`;

const StyledField = styled.div<Pick<FieldProps, 'type'>>`
    --spatial-navigation-contain: contain;

    display: flex;
    flex-direction: column;
    flex: 1;

    width: 100%;
    height: 100%;

    align-items: center;
    justify-content: center;

    align-self: ${({ type }) => (type === 'text' ? 'flex-start' : 'center')};
`;

const StyledErrorMessage = styled(Caption)`
    font-size: 24px;
    line-height: 32px;

    color: ${warning};
`;

export interface FieldProps {
    className?: string;
    type?: 'text' | 'select';
}
export interface FieldLabelProps extends FieldProps {
    label: string;
    align?: Align;
}

export const Field: React.FC<FieldProps> = ({ children, className, type = 'text' }) => {
    return (
        <StyledField className={className} type={type}>
            {children}
        </StyledField>
    );
};

export const FieldLabel: React.FC<FieldLabelProps> = ({ label, align = 'center', className }) => (
    <StyledLabel align={align} className={className}>
        {label}
    </StyledLabel>
);

export const FieldControl: React.FC<Pick<FieldProps, 'className'>> = ({ children, className }) => (
    <StyledFieldControl className={className}>{children}</StyledFieldControl>
);

interface FieldErrorMessagesProps {
    messages: ValidationMessage;
    errors: ValidityStateKeys[];
}

export const FieldErrorMessages: React.FC<FieldErrorMessagesProps> = ({ messages, errors }) => {
    const messagesToRender = useMemo(() => {
        const list = errors.map((error) => messages[error]);
        const uniqMessages = Array.from(new Set(list));

        return uniqMessages;
    }, [errors, messages]);

    return (
        <>
            {messagesToRender.map(
                (message) => message != null && <StyledErrorMessage key={message}>{message}</StyledErrorMessage>,
            )}
        </>
    );
};

type FootnoteProps = GetStyledComponentProps<typeof Footnote1>;
type InferStyledComponent = StyledComponent<'div', any, FootnoteProps, never>;

export const FieldAnnotation: InferStyledComponent = styled(Footnote1)`
    margin-top: 96px;
    color: ${secondary};
    padding: 0 270px;
    text-align: center;
`;
