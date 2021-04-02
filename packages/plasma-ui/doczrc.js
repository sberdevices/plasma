export default {
    typescript: true,
    title: 'Plasma UI Kit',
    ignore: ['**/*.stories.mdx'],
    filterComponents: (files) =>
        files.filter(
            (filepath) =>
                /[w-]*.(js|jsx|ts|tsx)$/.test(filepath) &&
                !filepath.includes('stories') &&
                !filepath.includes('examples'),
        ),
};
