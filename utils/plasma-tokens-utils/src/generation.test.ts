import {
    generateToken,
    generateTokens,
    generateThemes,
    generateTypography,
    generateTypographyValues,
    generateTypo,
    generateThemeJSON,
} from './generation';

const typoSystem = {
    fonts: { Regular: 'SBSansText Regular' },
    fontSizes: ['1rem'],
    fontWeights: { Regular: 400 },
    letterSpacings: ['0.1em'],
    lineHeights: ['1rem'],
    text: {
        h1: {},
    },
};

const light = {
    white: '#FFFFFF',
    whitePrimary: '#FFFFFF',
    whiteSecondary: '#FFFFFF',
    whiteTertiary: '#FFFFFF',

    black: '#FFFFFF',
    blackPrimary: '#FFFFFF',
    blackSecondary: '#FFFFFF',
    blackTertiary: '#FFFFFF',

    transparent: '#FFFFFF',

    text: '#FFFFFF',
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    tertiary: '#FFFFFF',

    background: '#FFFFFF',
    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#FFFFFF',
    backgroundTertiary: '#FFFFFF',

    accent: '#FFFFFF',
    warning: '#FFFFFF',
    critical: '#FFFFFF',

    overlay: '#FFFFFF',

    gradient: '#FFFFFF',

    surfaceLiquid01: '#FFFFFF',
    surfaceLiquid02: '#FFFFFF',
    surfaceLiquid03: '#FFFFFF',
    surfaceCard: '#FFFFFF',

    buttonPrimary: '#FFFFFF',
    buttonSecondary: '#FFFFFF',

    buttonAccent: '#FFFFFF',
    buttonWarning: '#FFFFFF',
    buttonCritical: '#FFFFFF',
    buttonChecked: '#FFFFFF',
    buttonFocused: '#FFFFFF',
};

describe('generateToken', () => {
    const value = generateToken({
        token: { value: { fontSize: '1rem' } },
        type: 'value',
        name: 'h1',
        withType: true,
    });
    const css = generateToken({
        token: { value: '#FFFFFF' },
        type: 'css',
        name: 'white',
        prefix: 'colors',
    });

    it('Should return value token with type', () => {
        expect(value).toMatch(/type H1 = .+;/gs);
        expect(value).toMatch(/export const h1: H1 = .+'fontSize': '1rem'/gs);
    });

    it('Should return simple CSS token', () => {
        expect(css).toContain("export const white = 'var(--plasma-colors-white, #FFFFFF)'");
    });
});

describe('generateTokens', () => {
    it('Should return value token', () => {
        expect(generateTokens({ test: { value: '123' } }, 'value')).toContain("export const test = '123';");
    });

    it('Should return CSS token', () => {
        expect(generateTokens({ test: { value: '123' } }, 'css', 'typo')).toContain(
            "export const test = 'var(--plasma-typo-test, 123)';",
        );
    });
});

describe('generateThemes', () => {
    const generatedCSSObject = generateThemes({ light: { border: { value: '#FFFFFF' } } }, 'cssobject', true);

    it('Array with theme files with objects with ":root" key and index', () => {
        expect(generatedCSSObject).toEqual(
            expect.arrayContaining([
                {
                    file: 'light.ts',
                    content: expect.stringMatching(/export const light .+:root.+--plasma-colors-border/gs),
                },
                { file: 'index.ts', content: expect.stringMatching(/export \{ light \} from/) },
            ]),
        );
    });
});

describe('generateTypography', () => {
    const generated = generateTypography(typoSystem);

    it('Array with token files and index', () => {
        expect(generated).toEqual(
            expect.arrayContaining([
                { file: 'h1.ts', content: expect.stringMatching(/export const h1/) },
                { file: 'index.ts', content: expect.stringMatching(/export \{ h1 \} from/) },
            ]),
        );
    });
});

describe('generateTypographyValues', () => {
    const generated = generateTypographyValues(typoSystem);

    it('Array with 6 files for each charasteristic and index', () => {
        expect(generated).toEqual(
            expect.arrayContaining([
                { file: 'fontSizes.ts', content: expect.stringMatching(/var\(--plasma-typo-fontSizes-0, 1rem\)/) },
                {
                    file: 'fonts.ts',
                    content: expect.stringMatching(/var\(--plasma-typo-fonts-regular, SBSansText Regular\)/),
                },
                {
                    file: 'fontWeights.ts',
                    content: expect.stringMatching(/var\(--plasma-typo-fontWeights-regular, 400\)/),
                },
                {
                    file: 'letterSpacings.ts',
                    content: expect.stringMatching(/var\(--plasma-typo-letterSpacings-0, 0.1em\)/),
                },
                { file: 'lineHeights.ts', content: expect.stringMatching(/var\(--plasma-typo-lineHeights-0, 1rem\)/) },
                { file: 'index.ts', content: expect.stringMatching(/export.+(font|line|letter).+from '.+';/) },
            ]),
        );
    });
});

describe('generateTypo', () => {
    const generated = generateTypo({ someDevice: { ':root': {} } });

    it('Array with token files and index', () => {
        expect(generated).toEqual(
            expect.arrayContaining([
                { file: 'someDevice.ts', content: expect.stringMatching(/export const someDevice .+:root/gs) },
                { file: 'index.ts', content: expect.stringMatching(/export \{ someDevice \} from/) },
            ]),
        );
    });
});

describe('generateThemeJSON', () => {
    const generated = generateThemeJSON(typoSystem, light, { light });

    it('Stringified JSON with key properties', () => {
        expect(generated).toMatch(/(fontSizes|colors|modes)/);
    });
});
