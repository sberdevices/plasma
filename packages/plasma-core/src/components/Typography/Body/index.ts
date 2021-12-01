import styled from 'styled-components';

import { body1, body2, body3 } from '../../../tokens';
import { applyHyphens, applySpacing, BreakWordProps, SpacingProps } from '../../../mixins';

export const Body1 = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${body1}
`;
export const Body2 = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${body2}
`;
export const Body3 = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${body3}
`;
