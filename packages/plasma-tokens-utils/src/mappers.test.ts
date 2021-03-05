import { mapDesignToBaseColors, mapDesignToTypography } from './mappers';

/* eslint-disable @typescript-eslint/camelcase */
const ds = {
    colors: {
        white: {
            color: 'rgba(255, 255, 255, 1)',
        },
        white_primary: {
            color: 'rgba(255, 255, 255, 1)',
        },
        white_secondary: {
            color: 'rgba(255, 255, 255, 1)',
        },
        white_tertiary: {
            color: 'rgba(255, 255, 255, 1)',
        },
        black: {
            color: 'rgba(0, 0, 0, 1)',
        },
        black_primary: {
            color: 'rgba(0, 0, 0, 1)',
        },
        black_secondary: {
            color: 'rgba(0, 0, 0, 1)',
        },
        black_tertiary: {
            color: 'rgba(0, 0, 0, 1)',
        },
        transparent: {
            color: 'rgba(0, 0, 0, 0)',
        },
    },
    typography: {},
};
/* eslint-enable @typescript-eslint/camelcase */

describe('mapDesignToBaseColors', () => {
    it('Should return base colors object', () => {
        expect(mapDesignToBaseColors(ds)).toMatchObject({
            black: {},
            blackPrimary: {},
            blackSecondary: {},
            blackTertiary: {},
            transparent: {},
            white: {},
            whitePrimary: {},
            whiteSecondary: {},
            whiteTertiary: {},
        });
    });
});

describe('mapDesignToTypography', () => {
    it('Should return typography object', () => {
        expect(mapDesignToTypography(ds)).toMatchObject({
            fontSizes: [],
            fontWeights: {},
            fonts: {},
            letterSpacings: [],
            lineHeights: [],
            text: {},
        });
    });
});
