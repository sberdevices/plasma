import styled from 'styled-components';

import { button1, button2 } from '../../../tokens';
import { applyHyphens, applySpacing, SpacingProps } from '../../../mixins';

export const Button1 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${button1}
`;
export const Button2 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${button2}
`;
