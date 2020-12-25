export default {
    typescript: true,
    title: 'Plasma UI Kit',
    base: '/pr1/',
    dest: './.docz/dist/pr1/',
    filterComponents: (files) =>
        files.filter((filepath) => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath) && !filepath.includes('stories')),
};
