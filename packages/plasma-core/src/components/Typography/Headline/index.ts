import styled from 'styled-components';

import { headline1, headline2, headline3, headline4 } from '../../../tokens';
import { applyHyphens, applySpacing, SpacingProps } from '../../../mixins';

export const Headline1 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${headline1}
`;
export const Headline2 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${headline2}
`;
export const Headline3 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${headline3}
`;
export const Headline4 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${headline4}
`;

export const H1 = styled.h1<SpacingProps>`
    margin: 0;
    ${applyHyphens}
    ${applySpacing}
    ${headline1}
`;
export const H2 = styled.h2<SpacingProps>`
    margin: 0;
    ${applyHyphens}
    ${applySpacing}
    ${headline2}
`;
export const H3 = styled.h3<SpacingProps>`
    margin: 0;
    ${applyHyphens}
    ${applySpacing}
    ${headline3}
`;
export const H4 = styled.h4<SpacingProps>`
    margin: 0;
    ${applyHyphens}
    ${applySpacing}
    ${headline4}
`;
