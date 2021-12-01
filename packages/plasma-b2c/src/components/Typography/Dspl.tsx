import styled from 'styled-components';

import { dsplL, dsplM, dsplS } from '../../tokens';
import { applyHyphens, applySpacing, BreakWordProps, SpacingProps } from '../../mixins';

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
