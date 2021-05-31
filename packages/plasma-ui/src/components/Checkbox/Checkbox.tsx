import styled from 'styled-components';
import { Checkbox as BaseCheckbox, CheckboxProps as BaseCheckboxProps } from '@sberdevices/plasma-core';

import type { InteractionProps } from '../../mixins';
import { basebox } from '../Basebox';

export interface CheckboxProps extends BaseCheckboxProps, InteractionProps {}

/**
 * Флажок или *чекбокс*. Позволяет пользователю управлять параметром с двумя состояниями — ☑ включено и ☐ отключено.
 */
export const Checkbox = styled(BaseCheckbox)<CheckboxProps>`
    ${basebox};
`;

Checkbox.defaultProps = {
    ...BaseCheckbox.defaultProps,
    scaleOnInteraction: true,
};
