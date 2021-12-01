import styled from 'styled-components';

import { textL, textLBold, textM, textMBold, textS, textSBold, textXS, textXSBold } from '../../tokens';
import { applyHyphens, applySpacing, BreakWordProps, SpacingProps } from '../../mixins';

import type { BoldProps } from './Typography.types';

export const TextL = styled.div<SpacingProps & BoldProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${({ bold }) => (bold ? textLBold : textL)}
`;
export const TextM = styled.div<SpacingProps & BoldProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${({ bold }) => (bold ? textMBold : textM)}
`;
export const TextS = styled.div<SpacingProps & BoldProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${({ bold }) => (bold ? textSBold : textS)}
`;
export const TextXS = styled.div<SpacingProps & BoldProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${({ bold }) => (bold ? textXSBold : textXS)}
`;
