import { getOpacity, getOffset, getScale } from './utils';

describe('PickerItem utils', () => {
    test.each([
        [0, 1],
        [0.3333, 0.67],
        [0.5, 0.5],
        [0.75, 0.25],
        [1, 0],
        [2, 0],
        [3, 0],
        [-3, 0],
    ])('getOpacity(%s, "l") return %s', (slot, opacity) => {
        expect(getOpacity(slot, 'l')).toEqual(opacity);
    });

    test('getOffset(0, "l") return 0', () => {
        expect(getOffset(0, 'l')).toEqual(0);
    });

    test('getOffset(0, "l") return negative (translate to top)', () => {
        expect(getOffset(0.5, 'l')).toBeLessThan(-0);
    });

    test('getOffset(0, "l") return positive (translate to bottom)', () => {
        expect(getOffset(-0.5, 'l')).toBeGreaterThan(0);
    });

    test.each([
        [0, 'l', 1],
        [1, 'l', 0.8],
        [-2, 'l', 0.8],
        [1, 's', 0.75],
        [-2, 's', 0.5],
        [3, 's', 0],
    ])('getScale(%s, "%s") return %s', (slot, size, opacity) => {
        expect(getScale(slot, size)).toEqual(opacity);
    });
});
