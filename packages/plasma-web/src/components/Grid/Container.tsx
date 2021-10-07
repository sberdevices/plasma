import styled, { css } from 'styled-components';
import { Container as BaseContainer } from '@sberdevices/plasma-core';

import { gridGutters, gridMargins, gridSizes, mediaQuery } from '../../utils';

const deviceScale = 1;
const sidesCount = 2;

/**
 * Блок с полями по бокам для размещения контента по вертикали.
 * Блок нельзя вкладывать сам в себя или дальше по дереву.
 */
export const Container = styled(BaseContainer)`
    max-width: 90rem;

    ${() =>
        gridSizes.map((breakpoint) =>
            mediaQuery(
                breakpoint,
                deviceScale,
            )(css`
                --plasma-grid-margin: ${gridMargins[breakpoint]}rem;
                --plasma-grid-gutter: ${gridGutters[breakpoint] / sidesCount}rem;
            `),
        )}
`;
