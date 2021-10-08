import styled from 'styled-components';

import { textL, textM, textS, textXS } from '../../tokens';
import { applyHyphens, applySpacing, SpacingProps } from '../../mixins';

export const TextL = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${textL}
`;
export const TextM = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${textM}
`;
export const TextS = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${textS}
`;
export const TextXS = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${textXS}
`;
