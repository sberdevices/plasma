import { generateColorThemes } from './generateColorThemes';

describe('generateColorThemes', () => {
    const generated = generateColorThemes({ light: { border: { value: '#FFFFFF' } } });
    const indexFile = generated.find((file) => file.file === 'index.ts');
    const themeFile = generated.find((file) => file.file === 'light.ts');

    it('Should generate two files: "index" and "light"', () => {
        expect(generated.length).toBe(2);
        expect(indexFile).toBeTruthy();
        expect(themeFile).toBeTruthy();
    });

    it('Index file should contain "light" re-export', () => {
        expect(indexFile?.content).toBe("export { light } from './light';\n");
    });

    it('Theme file should export of object with ":root" key', () => {
        expect(themeFile?.content).toEqual(
            expect.stringMatching(/export const light .+:root.+--plasma-colors-border/gs),
        );
    });
});
