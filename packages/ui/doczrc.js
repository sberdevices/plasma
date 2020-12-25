export default {
    typescript: true,
    title: 'Plasma UI Kit',
    filterComponents: (files) =>
        files.filter((filepath) => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath) && !filepath.includes('stories')),
};
