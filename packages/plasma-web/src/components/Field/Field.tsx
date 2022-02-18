import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import type { FieldProps as BaseProps, DisabledProps } from '@sberdevices/plasma-core';
import { applyDisabled } from '@sberdevices/plasma-core';

import {
    fieldTypo,
    fieldHelperTextTypo,
    fieldColor,
    fieldContentMargin,
    fieldHelperTextMarginTop,
    fieldLabelColor,
    fieldLabelMarginBottom,
} from '../../tokens';

import { statuses } from './Field.props';

export interface FieldProps extends BaseProps, DisabledProps, HTMLAttributes<HTMLLabelElement> {}

const StyledField = styled.label<FieldProps>`
    ${fieldTypo}
    ${applyDisabled}

    position: relative;
    display: flex;
    flex-direction: column;

    color: ${fieldColor};

    ${({ status }) => status && statuses[status]}
`;
const StyledLabel = styled.span`
    margin-bottom: ${fieldLabelMarginBottom};
    color: ${fieldLabelColor};
`;
const StyledInputWrapper = styled.div`
    position: relative;
`;
const StyledContent = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
`;
const StyledContentLeft = styled(StyledContent)`
    left: 0;
    margin-left: ${fieldContentMargin};
`;
const StyledContentRight = styled(StyledContent)`
    right: 0;
    margin-right: ${fieldContentMargin};
`;
const StyledHelperText = styled.span`
    ${fieldHelperTextTypo}

    margin-top: ${fieldHelperTextMarginTop};
`;

export const Field: FC<FieldProps> = ({ id, label, children, contentLeft, contentRight, helperText, ...rest }) => {
    return (
        <StyledField id={id ? `${id}-field` : undefined} {...rest}>
            {label && <StyledLabel id={id ? `${id}-label` : undefined}>{label}</StyledLabel>}
            <StyledInputWrapper>
                {contentLeft && <StyledContentLeft>{contentLeft}</StyledContentLeft>}
                {children}
                {contentRight && <StyledContentRight>{contentRight}</StyledContentRight>}
            </StyledInputWrapper>
            {helperText && <StyledHelperText id={id ? `${id}-helpertext` : undefined}>{helperText}</StyledHelperText>}
        </StyledField>
    );
};
