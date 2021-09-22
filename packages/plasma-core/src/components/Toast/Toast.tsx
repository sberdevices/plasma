import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { applyNoSelect } from '../../mixins';
import { dark02, white } from '../../tokens';
import { Footnote1 } from '../Typography';

export type ToastProps = {
    text: string;
    contentLeft?: ReactNode;
};

const StyledRoot = styled(Footnote1)`
    display: inline-flex;
    padding: 0.75rem 1.25rem;
    border-radius: 1.25rem;

    background: ${dark02};
    color: ${white};

    ${applyNoSelect};
`;
const StyledContent = styled.div`
    margin-right: 0.5rem;
`;

/**
 * Короткие текстовые подсказки.
 * Вызываются только в текущем запущенном приложении как реакция на выполнение действия пользователем.
 */
export const Toast: React.FC<ToastProps> = ({ text, contentLeft }) => (
    <StyledRoot>
        {contentLeft && <StyledContent>{contentLeft}</StyledContent>}
        {text}
    </StyledRoot>
);
