import { generateToken, generateTokens, generateTypography, generateTypographyValues } from './generation';

const typoSystem = {
    fonts: { Regular: 'SBSansText Regular' },
    fontSizes: ['1rem'],
    fontWeights: { Regular: 400 },
    letterSpacings: ['0.1em'],
    lineHeights: ['1rem'],
    typoStyles: {
        h1: {},
    },
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

describe('generateTypography', () => {
    const generated = generateTypography(typoSystem.typoStyles);

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

// TODO: https://github.com/sberdevices/plasma/issues/467
describe.skip('generateThemeJSON', () => {});
