import styled from 'styled-components';

import { paragraph1, paragraph2 } from '../../../tokens';
import { applyHyphens, applySpacing, BreakWordProps, SpacingProps } from '../../../mixins';

export const ParagraphText1 = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${paragraph1}
`;
export const ParagraphText2 = styled.div<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${paragraph2}
`;

export const P1 = styled.p<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${paragraph1}
    margin: 0;
`;
export const P = P1;
export const P2 = styled.p<SpacingProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${paragraph2}
    margin: 0;
`;
