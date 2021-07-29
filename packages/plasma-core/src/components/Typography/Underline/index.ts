import styled from 'styled-components';

import { underline } from '../../../tokens';
import { applyHyphens, applySpacing, SpacingProps } from '../../../mixins';

export const Underline = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${underline}
`;
