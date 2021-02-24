import styled from 'styled-components';

import { Basebox, BaseboxProps } from '../Basebox';

export type RadioboxProps = Omit<BaseboxProps, 'type'>;

/**
 * Переключатель, или *радиокнопка*.
 */
export const Radiobox = styled(Basebox).attrs((props) => ({ ...props, type: 'radio' }))<RadioboxProps>``;
