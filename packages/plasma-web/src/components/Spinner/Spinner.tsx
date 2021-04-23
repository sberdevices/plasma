import styled from 'styled-components';
import { Spinner as SpinnerBase, SpinnerProps as SpinnerPropsBase } from '@sberdevices/plasma-core';

export interface SpinnerProps extends SpinnerPropsBase {}

/**
 * Компонент для отображения индикатора загрузки.
 */
export const Spinner = styled(SpinnerBase)<SpinnerProps>``;
