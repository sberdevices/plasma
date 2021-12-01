import styled from 'styled-components';

import {
    bodyL,
    bodyLBold,
    bodyM,
    bodyMBold,
    bodyS,
    bodySBold,
    bodyXS,
    bodyXSBold,
    bodyXXS,
    bodyXXSBold,
} from '../../tokens';
import { applyHyphens, applySpacing, BreakWordProps, SpacingProps } from '../../mixins';

import type { BoldProps } from './Typography.types';

export const BodyL = styled.div<SpacingProps & BoldProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${({ bold }) => (bold ? bodyLBold : bodyL)}
`;
export const BodyM = styled.div<SpacingProps & BoldProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${({ bold }) => (bold ? bodyMBold : bodyM)}
`;
export const BodyS = styled.div<SpacingProps & BoldProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${({ bold }) => (bold ? bodySBold : bodyS)}
`;
export const BodyXS = styled.div<SpacingProps & BoldProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${({ bold }) => (bold ? bodyXSBold : bodyXS)}
`;
export const BodyXXS = styled.div<SpacingProps & BoldProps & BreakWordProps>`
    ${applyHyphens}
    ${applySpacing}
    ${({ bold }) => (bold ? bodyXXSBold : bodyXXS)}
`;
