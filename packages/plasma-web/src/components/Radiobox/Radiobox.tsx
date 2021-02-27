import { Radiobox as BaseRadiobox } from '@sberdevices/plasma-core/components/Radiobox';
import styled from 'styled-components';

import { basebox } from '../Basebox';

export type { RadioboxProps } from '@sberdevices/plasma-core/components/Radiobox';

/**
 * Переключатель, или *радиокнопка*.
 */
export const Radiobox = styled(BaseRadiobox)`
    ${basebox};
`;
