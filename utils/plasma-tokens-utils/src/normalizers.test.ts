import { normalizeFontWeight } from './normalizers';

const typo = {
    fontFamily: 'SBSansText Regular',
    fontSize: '1',
    fontWeight: 400,
    letterSpacing: 0.1,
    lineHeight: '1',
};

describe('normalizeFontWeight', () => {
    it('Should correct font weight', () => {
        expect(normalizeFontWeight(typo)).toMatchObject({
            fontFamily: 'SBSansText Regular',
            fontWeight: '400',
        });
    });
});
