import React from 'react';
import styled from 'styled-components';
import FocusLock from 'react-focus-lock';
import { backgroundPrimary } from '@sberdevices/plasma-core';
import { IconClose } from '@sberdevices/plasma-icons';

import { Button } from '../Button';

export interface ModalViewProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Содержимое модального окна.
     */
    children?: React.ReactNode;
    /**
     * Обработчик клика по кнопке "закрыть".
     */
    onClose?: () => void;
}

const StyledBody = styled.div`
    position: relative;

    width: 25rem;
    max-width: 100%;

    border-radius: 1.25rem;
    background-color: ${backgroundPrimary};
`;
const StyledContent = styled.div`
    padding: 2rem;
`;
const StyledButtonClose = styled(Button).attrs(() => ({ view: 'clear' }))`
    float: right;

    margin: 2rem;

    width: auto;
    height: auto;
    padding: 0;
`;

/**
 * Визуальная часть модального окна.
 */
export const ModalView = React.forwardRef<HTMLDivElement, ModalViewProps>(
    ({ role = 'dialog', children, onClose, ...rest }, ref) => {
        return (
            <FocusLock returnFocus>
                <StyledBody ref={ref} role={role} {...rest}>
                    <StyledButtonClose onClick={onClose} contentLeft={<IconClose size="s" color="inherit" />} />
                    <StyledContent>{children}</StyledContent>
                </StyledBody>
            </FocusLock>
        );
    },
);
