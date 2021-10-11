import styled from 'styled-components';

import { bodyL, bodyM, bodyS, bodyXS, bodyXXS } from '../../tokens';
import { applyHyphens, applySpacing, SpacingProps } from '../../mixins';

export const BodyL = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${bodyL}
`;
export const BodyM = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${bodyM}
`;
export const BodyS = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${bodyS}
`;
export const BodyXS = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${bodyXS}
`;
export const BodyXXS = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${bodyXXS}
`;
