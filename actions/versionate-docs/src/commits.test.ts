import { getDocPackages } from './commits';

const commits = [
    'docs(plasma-ui, plasma-web): Message',
    'docs(plasma-ui): Message',
    'feat(plasma-ui): Message',
    'chore: Message',
    'docs: Message',
    'Bad commit',
    'feat(plasma-ui): Message [docs]',
    'fix!: Message [skip ci]',
    'docs(plasma-b2c): Message',
    'docs(plasma-temple): Message',
];
const unique = ['plasma-ui-docs', 'plasma-web-docs', 'plasma-temple-docs'];

describe('commits.ts', () => {
    it('getDocPackages', () => {
        expect(getDocPackages(commits)).toStrictEqual(unique);
    });
});
