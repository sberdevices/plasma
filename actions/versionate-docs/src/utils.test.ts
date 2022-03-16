import { sortVersions } from './utils';

const versionsArchived = {
    '1.82.3': '',
    '1.81.4': '',
    '1.81.1': '',
};

describe('utils.ts', () => {
    it('sortVersions', () => {
        const moreVersions = {
            ...versionsArchived,
            '2.0.0-beta1': '',
            '1.35.1': '',
            '1.100.0': '',
            '1.100.1': '',
            '2.0.0-beta2': '',
        };
        expect(Object.keys(sortVersions(moreVersions))).toStrictEqual([
            '2.0.0-beta2',
            '2.0.0-beta1',
            '1.100.1',
            '1.100.0',
            '1.82.3',
            '1.81.4',
            '1.81.1',
            '1.35.1',
        ]);
    });
});
