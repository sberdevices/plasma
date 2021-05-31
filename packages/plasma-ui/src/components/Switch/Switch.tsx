import styled from 'styled-components';
import { Switch as BaseSwitch } from '@sberdevices/plasma-core';
import { accent, surfaceLiquid03, white } from '@sberdevices/plasma-tokens';

export type { SwitchProps } from '@sberdevices/plasma-core';

/**
 * Визуальный переключатель между двумя взаимоисключающими состояниями — вкл. и выкл.
 */
export const Switch = styled(BaseSwitch)`
    --plasma-switch-trigger-background: ${surfaceLiquid03};
    --plasma-switch-trigger-background-checked: ${accent};
    --plasma-switch-ellipse-background: ${white};
`;
