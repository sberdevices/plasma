import { humanizeColor } from './functions';

describe('humanizeColor', () => {
    it('Should return color with alpha', () => {
        expect(humanizeColor('rgba(255, 255, 255, 0.96)')).toBe('rgba(255, 255, 255, 0.96)');
    });
    it('Should return hex color', () => {
        expect(humanizeColor('rgba(255, 255, 255, 1)')).toBe('#FFFFFF');
    });
});
