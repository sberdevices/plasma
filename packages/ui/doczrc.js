export default {
    typescript: true,
    title: 'Plasma UI Kit',
    // src: './src',
    // ignore: ['../plasma-tokens/**', '../plasma-styles/**'],
    // ignore: ['README.md'],
    // files: ['../../README.md'],
    filterComponents: (files) =>
        files.filter((filepath) => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath) && !filepath.includes('stories')),
};
