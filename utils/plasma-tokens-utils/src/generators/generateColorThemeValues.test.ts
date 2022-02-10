import { generateColorThemeValues } from './generateColorThemeValues';

describe('generateColorThemeValues', () => {
    const generated = generateColorThemeValues({ light: { border: { value: '#FFFFFF' } } });

    it('Should generate one file which name is "light"', () => {
        expect(generated.length).toBe(1);
        expect(generated[0].file).toBe('light.ts');
    });

    it('Content of a file is a singular constant', () => {
        expect(generated[0].content).toBe("export const border = '#FFFFFF';\n\n");
    });
});
