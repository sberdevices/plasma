import styled, { css } from 'styled-components';
import { Container as BaseContainer } from '@sberdevices/plasma-core/components/Grid';
import { mediaQuery, gridSizes, gridMargins as baseMargins, gridGutters } from '@sberdevices/plasma-core/utils';

const gridMargins = {
    ...baseMargins,
    S: 2,
    XL: 6.25,
};

const deviceScale = 1;
const sidesCount = 2;

/**
 * Блок с полями по бокам для размещения контента по вертикали.
 * Блок нельзя вкладывать сам в себя или дальше по дереву.
 */
export const Container = styled(BaseContainer)`
    max-width: 90rem;

    && {
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
    }
`;
