import styled from 'styled-components';
import { applyHyphens, applySpacing } from '@sberdevices/plasma-core';
import type { BreakWordProps, SpacingProps } from '@sberdevices/plasma-core';

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
} from '../tokens';
import type { BoldProps } from '../types';

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
