const { mergeWith } = require('docz-utils');
const fs = require('fs-extra');

let custom = {};
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js');

if (hasGatsbyConfig) {
    try {
        custom = require('./gatsby-config.custom');
    } catch (err) {
        console.error(`Failed to load your gatsby-config.js file : `, JSON.stringify(err));
    }
}

const config = {
    pathPrefix: '/',

    siteMetadata: {
        title: 'Ui',
        description: 'SberDevices Design System',
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-typescript',
            options: {
                isTSX: true,
                allExtensions: true,
            },
        },
        {
            resolve: 'gatsby-theme-docz',
            options: {
                themeConfig: {},
                src: './',
                gatsbyRoot: null,
                themesDir: 'src',
                mdxExtensions: ['.md', '.mdx'],
                docgenConfig: {},
                menu: [],
                mdPlugins: [],
                hastPlugins: [],
                ignore: [],
                typescript: true,
                ts: false,
                propsParser: true,
                'props-parser': true,
                debug: false,
                native: false,
                openBrowser: null,
                o: null,
                open: null,
                'open-browser': null,
                root: '/Users/out-antonov-ia/work/mono/packages/ui/.docz',
                base: '/',
                source: './',
                'gatsby-root': null,
                files: '**/*.{md,markdown,mdx}',
                public: '/public',
                dest: '.docz/dist',
                d: '.docz/dist',
                editBranch: 'master',
                eb: 'master',
                'edit-branch': 'master',
                config: '',
                title: 'Ui',
                description: 'SberDevices Design System',
                host: 'localhost',
                port: 3000,
                p: 3000,
                separator: '-',
                paths: {
                    root: '/Users/out-antonov-ia/work/mono/packages/ui',
                    templates: '/Users/out-antonov-ia/work/mono/packages/ui/node_modules/docz-core/dist/templates',
                    docz: '/Users/out-antonov-ia/work/mono/packages/ui/.docz',
                    cache: '/Users/out-antonov-ia/work/mono/packages/ui/.docz/.cache',
                    app: '/Users/out-antonov-ia/work/mono/packages/ui/.docz/app',
                    appPackageJson: '/Users/out-antonov-ia/work/mono/packages/ui/package.json',
                    appTsConfig: '/Users/out-antonov-ia/work/mono/packages/ui/tsconfig.json',
                    gatsbyConfig: '/Users/out-antonov-ia/work/mono/packages/ui/gatsby-config.js',
                    gatsbyBrowser: '/Users/out-antonov-ia/work/mono/packages/ui/gatsby-browser.js',
                    gatsbyNode: '/Users/out-antonov-ia/work/mono/packages/ui/gatsby-node.js',
                    gatsbySSR: '/Users/out-antonov-ia/work/mono/packages/ui/gatsby-ssr.js',
                    importsJs: '/Users/out-antonov-ia/work/mono/packages/ui/.docz/app/imports.js',
                    rootJs: '/Users/out-antonov-ia/work/mono/packages/ui/.docz/app/root.jsx',
                    indexJs: '/Users/out-antonov-ia/work/mono/packages/ui/.docz/app/index.jsx',
                    indexHtml: '/Users/out-antonov-ia/work/mono/packages/ui/.docz/app/index.html',
                    db: '/Users/out-antonov-ia/work/mono/packages/ui/.docz/app/db.json',
                },
            },
        },
    ],
};

const merge = mergeWith((objValue, srcValue) => {
    if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
});

module.exports = merge(config, custom);
