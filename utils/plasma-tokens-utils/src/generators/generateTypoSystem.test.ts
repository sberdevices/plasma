import { generateTypoSystem } from './generateTypoSystem';

describe('generateTypoSystem', () => {
    const generated = generateTypoSystem({ someDevice: { theme: { button: { fontSize: '12px' } } } });
    const indexFile = generated.find((file) => file.file === 'index.ts');
    const someDevice = generated.find((file) => file.file === 'someDevice.ts');

    it('Should generate two files: "index" and "someDevice"', () => {
        expect(generated.length).toBe(2);
        expect(indexFile).toBeTruthy();
        expect(someDevice).toBeTruthy();
    });

    it('Index file should contain "someDevice" re-export', () => {
        expect(indexFile?.content).toBe("export { someDevice } from './someDevice';\n");
    });

    it('Typo file should export of object with ":root" key', () => {
        expect(someDevice?.content).toEqual(expect.stringMatching(/export const someDevice .+:root/gs));
    });
});
