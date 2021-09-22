import React from 'react';
import styled from 'styled-components';

import { applyNoSelect } from '../../mixins';
import { dark02, white } from '../../tokens';
import { Footnote1 } from '../Typography';

export type ToastProps = {
    text: string;
};

const StyledRoot = styled(Footnote1)`
    display: inline-block;
    padding: 0.75rem 1.25rem;
    border-radius: 1.25rem;

    background: ${dark02};
    color: ${white};

    ${applyNoSelect};
`;

/**
 * Короткие текстовые подсказки.
 * Вызываются только в текущем запущенном приложении как реакция на выполнение действия пользователем.
 */
export const Toast: React.FC<ToastProps> = ({ text }) => <StyledRoot>{text}</StyledRoot>;
