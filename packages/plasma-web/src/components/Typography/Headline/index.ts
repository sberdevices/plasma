import styled from 'styled-components';
import { applyHyphens, applySpacing, SpacingProps } from '@sberdevices/plasma-core';

import { headline5 } from '../../../tokens';

export { Headline1, Headline2, Headline3, Headline4 } from '@sberdevices/plasma-core';

export const Headline5 = styled.div<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${headline5}
`;

export const H5 = styled.h5<SpacingProps>`
    ${applyHyphens}
    ${applySpacing}
    ${headline5}
    margin: 0;
`;
