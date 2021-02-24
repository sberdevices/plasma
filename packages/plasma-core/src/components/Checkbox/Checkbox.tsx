import styled from 'styled-components';

import { Basebox, BaseboxProps } from '../Basebox';

export type CheckboxProps = Omit<BaseboxProps, 'type'>;

/**
 * Флажок или *чекбокс*. Позволяет пользователю управлять параметром с двумя состояниями — ☑ включено и ☐ отключено.
 */
export const Checkbox = styled(Basebox).attrs((props) => ({ ...props, type: 'checkbox' }))<CheckboxProps>``;
