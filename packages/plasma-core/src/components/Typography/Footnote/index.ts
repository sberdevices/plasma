import styled from 'styled-components';

import { footnote1, footnote2 } from '../../../tokens';
import { applyHyphens, applySpacing, SpacingProps } from '../../../mixins';

export const Footnote1 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${footnote1}
`;
export const Footnote2 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${footnote2}
`;
