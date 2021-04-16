import styled from 'styled-components';
import { Switch as BaseSwitch } from '@sberdevices/plasma-core/components/Switch';
import { accent, tertiary, white } from '@sberdevices/plasma-tokens-web';

export type { SwitchProps } from '@sberdevices/plasma-core/components/Switch';

/**
 * Визуальный переключатель между двумя взаимоисключающими состояниями — вкл. и выкл.
 */
export const Switch = styled(BaseSwitch)`
    --plasma-switch-trigger-background: ${tertiary};
    --plasma-switch-trigger-background-checked: ${accent};
    --plasma-switch-ellipse-background: ${white};
`;
