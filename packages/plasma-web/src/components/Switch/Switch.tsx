import styled from 'styled-components';
import { Switch as BaseSwitch, accent, tertiary, white } from '@sberdevices/plasma-core';

export type { SwitchProps } from '@sberdevices/plasma-core';

/**
 * Визуальный переключатель между двумя взаимоисключающими состояниями — вкл. и выкл.
 */
export const Switch = styled(BaseSwitch)`
    --plasma-switch-trigger-background: ${tertiary};
    --plasma-switch-trigger-background-checked: ${accent};
    --plasma-switch-ellipse-background: ${white};
`;
