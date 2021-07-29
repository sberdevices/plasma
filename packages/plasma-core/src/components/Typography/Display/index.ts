import styled from 'styled-components';

import { display1, display2, display3 } from '../../../tokens';
import { applyHyphens, applySpacing, SpacingProps } from '../../../mixins';

export const Display1 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${display1}
`;
export const Display2 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${display2}
`;
export const Display3 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${display3}
`;
