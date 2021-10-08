import styled from 'styled-components';

import { dsplL, dsplM, dsplS } from '../../tokens';
import { applyHyphens, applySpacing, SpacingProps } from '../../mixins';

export const DsplL = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${dsplL}
`;
export const DsplM = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${dsplM}
`;
export const DsplS = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${dsplS}
`;
