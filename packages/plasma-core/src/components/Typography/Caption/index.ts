import styled from 'styled-components';

import { caption } from '../../../tokens';
import { applyHyphens, applySpacing, SpacingProps } from '../../../mixins';

export const Caption = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${caption}
`;
