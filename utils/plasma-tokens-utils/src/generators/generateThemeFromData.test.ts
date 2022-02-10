import { generateThemeFromData } from './generateThemeFromData';

describe('generateThemeFromData', () => {
    const generated = generateThemeFromData({ button: { border: '#FFFFFF' } }, 'button');

    it('Should generate one file which name is "button"', () => {
        expect(generated).toBeTruthy();
        expect(generated.file).toBe('button.ts');
    });

    it('Theme file should export of object with ":root" key', () => {
        expect(generated.content).toEqual(expect.stringMatching(/export const button .+:root/gs));
    });
});
