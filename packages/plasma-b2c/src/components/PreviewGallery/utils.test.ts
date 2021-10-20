import { arrayItemRemoving, arrayItemSwapping, arrayItemSelecting } from './utils';

const items = [
    { id: 1, caption: '1' },
    { id: 2, caption: '2' },
    { id: 3, caption: '3' },
    { id: 4, caption: '4' },
];

const itemStringId = [
    { id: 'asd', caption: 'asd' },
    { id: 'fsd', caption: 'fsd' },
    { id: 'qwe', caption: 'qwe' },
    { id: 'uyu', caption: 'uyu' },
];

const itemsWithSelected = [
    { id: 1, caption: '1', isSelected: true },
    { id: 2, caption: '2' },
    { id: 3, caption: '3' },
    { id: 4, caption: '4' },
];

describe('PreviewGallery utils', () => {
    describe('arrayItemRemoving', () => {
        it('Should return empty array', () => {
            expect(arrayItemRemoving([], 0)).toEqual([]);
        });

        it('Should return new array without element by number id', () => {
            expect(arrayItemRemoving(items, 1)).toEqual([
                { id: 2, caption: '2' },
                { id: 3, caption: '3' },
                { id: 4, caption: '4' },
            ]);
        });

        it('Should return new array without element by string id', () => {
            expect(arrayItemRemoving(itemStringId, 'asd')).toEqual([
                { id: 'fsd', caption: 'fsd' },
                { id: 'qwe', caption: 'qwe' },
                { id: 'uyu', caption: 'uyu' },
            ]);
        });

        it('Should return the same array', () => {
            expect(arrayItemRemoving(items, 123)).toEqual([
                { id: 1, caption: '1' },
                { id: 2, caption: '2' },
                { id: 3, caption: '3' },
                { id: 4, caption: '4' },
            ]);
        });
    });

    describe('arrayItemSwapping', () => {
        it('Should return empty array', () => {
            expect(arrayItemSwapping([], 0, 0)).toEqual([]);
        });

        it('Should return new array with swapping items between first and second indexes', () => {
            expect(arrayItemSwapping(items, 0, 1)).toEqual([
                { id: 2, caption: '2' },
                { id: 1, caption: '1' },
                { id: 3, caption: '3' },
                { id: 4, caption: '4' },
            ]);
        });

        it('Should return new array with swapping items between first and last indexes', () => {
            expect(arrayItemSwapping(items, 0, 3)).toEqual([
                { id: 2, caption: '2' },
                { id: 3, caption: '3' },
                { id: 4, caption: '4' },
                { id: 1, caption: '1' },
            ]);
        });

        it('Should return new array with swapping items between last and first indexes', () => {
            expect(arrayItemSwapping(items, 3, 0)).toEqual([
                { id: 4, caption: '4' },
                { id: 1, caption: '1' },
                { id: 2, caption: '2' },
                { id: 3, caption: '3' },
            ]);
        });

        it('Should return the same array', () => {
            expect(arrayItemSwapping(items, 1, 1)).toEqual([
                { id: 1, caption: '1' },
                { id: 2, caption: '2' },
                { id: 3, caption: '3' },
                { id: 4, caption: '4' },
            ]);
        });
    });

    describe('arrayItemSelecting', () => {
        it('Should return empty array', () => {
            expect(arrayItemSelecting([], 1)).toEqual([]);
        });

        it('Should return new array with selected element by number id', () => {
            expect(arrayItemSelecting(items, 1)).toEqual([
                { id: 1, caption: '1', isSelected: true },
                { id: 2, caption: '2' },
                { id: 3, caption: '3' },
                { id: 4, caption: '4' },
            ]);
        });

        it('Should return new array with selected element by string id', () => {
            expect(arrayItemSelecting(itemStringId, 'qwe')).toEqual([
                { id: 'asd', caption: 'asd' },
                { id: 'fsd', caption: 'fsd' },
                { id: 'qwe', caption: 'qwe', isSelected: true },
                { id: 'uyu', caption: 'uyu' },
            ]);
        });

        it('Should return new array with changed selected element by number id', () => {
            expect(arrayItemSelecting(itemsWithSelected, 3)).toEqual([
                { id: 1, caption: '1', isSelected: false },
                { id: 2, caption: '2' },
                { id: 3, caption: '3', isSelected: true },
                { id: 4, caption: '4' },
            ]);
        });

        it('Should return new array with multiple selected elements by number id', () => {
            expect(arrayItemSelecting(itemsWithSelected, 2, true)).toEqual([
                { id: 1, caption: '1', isSelected: true },
                { id: 2, caption: '2', isSelected: true },
                { id: 3, caption: '3' },
                { id: 4, caption: '4' },
            ]);
        });

        it('Should return the same array', () => {
            expect(arrayItemSelecting(items, 123)).toEqual([
                { id: 1, caption: '1' },
                { id: 2, caption: '2' },
                { id: 3, caption: '3' },
                { id: 4, caption: '4' },
            ]);
        });
    });
});
