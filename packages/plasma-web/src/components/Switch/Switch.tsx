import styled from 'styled-components';
import { Switch as BaseSwitch } from '@sberdevices/plasma-core/components/Switch';

import { accent, tertiary, white } from '../../tokens';

export type { SwitchProps } from '@sberdevices/plasma-core/components/Switch';

export const Switch = styled(BaseSwitch)`
    --plasma-switch-trigger-background: ${tertiary};
    --plasma-switch-trigger-background-checked: ${accent};
    --plasma-switch-ellipse-background: ${white};
`;
