import { last, replaceLast } from './last';

describe('Testing util `last` & `replaceLast`', () => {
    describe('last fn', () => {
        it('last fn with filled array', () => {
            expect(last(['first', 'second', 'last'])).toBe('last');
        });

        it('last fn with empty array', () => {
            expect(last([])).toBeUndefined();
        });
    });

    describe('replaceLast fn', () => {
        it('replaceLast with correct arguments', () => {
            expect(replaceLast(['first', 'second', 'last'], 'replacedLast')).toStrictEqual([
                'first',
                'second',
                'replacedLast',
            ]);
        });

        it('replaceLast with empty array', () => {
            expect(replaceLast([], 'nextLast')).toStrictEqual(['nextLast']);
        });
    });
});
