import styled from 'styled-components';

import { h1, h2, h3, h4, h5 } from '../../tokens';
import { applyHyphens, applySpacing, BreakWordProps, SpacingProps } from '../../mixins';

export const H1 = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${h1}
`;
export const H2 = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${h2}
`;
export const H3 = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${h3}
`;
export const H4 = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${h4}
`;
export const H5 = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${h5}
`;
