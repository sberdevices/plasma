import styled, { css } from 'styled-components';
import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@sberdevices/plasma-core/components/Button';

import { buttonAccentHover, buttonSecondaryHover, buttonCriticalHover } from '../../tokens';

type ButtonSizes = 'l' | 'm' | 's';
type ButtonViews = 'primary' | 'secondary' | 'critical';

export type ButtonProps = BaseButtonProps<ButtonSizes, ButtonViews> & React.ButtonHTMLAttributes<HTMLButtonElement>;

const hovers = {
    primary: buttonAccentHover,
    secondary: buttonSecondaryHover,
    critical: buttonCriticalHover,
};

/**
 * Основной компонент для создания кнопок.
 */
export const Button = styled(BaseButton)<ButtonProps>`
    transition: background-color 0.1s ease-in-out;

    &:hover {
        ${({ view }) =>
            view &&
            css`
                background-color: ${hovers[view]};
            `}
    }
`;
