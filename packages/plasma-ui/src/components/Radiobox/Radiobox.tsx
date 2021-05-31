import { Radiobox as BaseRadiobox, RadioboxProps as BaseRadioboxProps } from '@sberdevices/plasma-core';
import styled from 'styled-components';

import type { InteractionProps } from '../../mixins';
import { basebox } from '../Basebox';

export interface RadioboxProps extends BaseRadioboxProps, InteractionProps {}

/**
 * Переключатель (радиокнопка). С помощью ``RadioboxList`` можно создавать списки радиокнопок.
 */
export const Radiobox = styled(BaseRadiobox)<RadioboxProps>`
    ${basebox};
`;

Radiobox.defaultProps = {
    ...BaseRadiobox.defaultProps,
    scaleOnInteraction: true,
};
