import styled from 'styled-components';
import { applyHyphens, applySpacing } from '@sberdevices/plasma-core';
import type { BreakWordProps, SpacingProps } from '@sberdevices/plasma-core';

import { dsplL, dsplM, dsplS } from '../tokens';

export const DsplL = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${dsplL}
`;
export const DsplM = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${dsplM}
`;
export const DsplS = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${dsplS}
`;
