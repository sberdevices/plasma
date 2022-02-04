// eslint-disable-next-line @typescript-eslint/no-var-requires
const lightCodeTheme = require('prism-react-renderer/themes/github');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const docgen = require('react-docgen-typescript');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fg = require('fast-glob');

const { PR_NAME, VERSION_NAME } = process.env;
const prefix = VERSION_NAME || !PR_NAME ? '' : `/${PR_NAME}`;
const baseUrl = VERSION_NAME ? `/${VERSION_NAME}/` : `${prefix}/temple/`;

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: 'Plasma Temple',
    tagline: 'Шаблоны для ускорения разработки канвасов.',
    url: 'https://plasma.sberdevices.ru/',
    baseUrl,
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'images/favicon.png',
    organizationName: 'SberDevices',
    projectName: 'Plasma',
    themes: ['@docusaurus/theme-live-codeblock'],
    themeConfig: {
        navbar: {
            title: 'Plasma',
            logo: {
                alt: 'Plasma',
                src: 'images/plasma-logo.png',
            },
            items: [
                {
                    type: 'doc',
                    position: 'left',
                    docId: 'core',
                    label: 'Temple',
                },
                {
                    href: `https://plasma.sberdevices.ru${prefix}/ui/`,
                    position: 'left',
                    label: 'UI',
                },
                {
                    href: `https://plasma.sberdevices.ru${prefix}/web/`,
                    position: 'left',
                    label: 'Web',
                },
                {
                    href: 'https://github.com/sberdevices/plasma',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'light',
            links: [
                {
                    title: 'Документация',
                    items: [
                        {
                            label: 'Plasma UI',
                            to: `https://plasma.sberdevices.ru${prefix}/ui/`,
                        },
                        {
                            label: 'Plasma Web',
                            to: `https://plasma.sberdevices.ru${prefix}/web/`,
                        },
                        {
                            label: 'Plasma Temple',
                            to: '/',
                        },
                    ],
                },
                {
                    title: 'Сообщество',
                    items: [
                        {
                            label: 'Telegram',
                            href: 'https://t.me/smartmarket_community',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/sberdevices/plasma',
                        },
                    ],
                },
            ],
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme,
        },
        // ...
        colorMode: {
            // "light" | "dark"
            defaultMode: 'light',

            // Hides the switch in the navbar
            // Useful if you want to support a single color mode
            disableSwitch: false,

            // Whether to use the prefers-color-scheme media-query,
            // using user system preferences, instead of the hardcoded defaultMode.
            respectPrefersColorScheme: true,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/sberdevices/plasma/blob/master/website/plasma-temple-docs/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
    plugins: [
        function docgenPlugin() {
            return {
                name: 'docusaurus-plugin-react-docgen-typescript',
                async loadContent() {
                    return docgen
                        .withCustomConfig('./tsconfig.json', {
                            shouldExtractLiteralValuesFromEnum: true,
                            shouldRemoveUndefinedFromOptional: true,
                            propFilter: (prop) => {
                                if (prop.parent) {
                                    return !prop.parent.fileName.includes('@types/react');
                                }
                                return true;
                            },
                        })
                        .parse(
                            await fg([
                                '../../packages/plasma-temple/src/**/*.{ts,tsx}',
                                '!../../packages/plasma-temple/src/**/*.test.*',
                            ]),
                        );
                },
                configureWebpack(config) {
                    return {
                        resolve: {
                            alias: {
                                '@docgen': path.join(
                                    config.resolve.alias['@generated'],
                                    'docusaurus-plugin-react-docgen-typescript',
                                    'default',
                                ),
                            },
                        },
                    };
                },
                async contentLoaded({ content, actions }) {
                    const names = [];
                    content
                        .filter((module) => {
                            const result =
                                !names.includes(module.displayName) &&
                                /^[A-Z]/.test(module.displayName) &&
                                (module.props || module.description) &&
                                module.displayName !== 'Default';

                            if (result) {
                                names.push(module.displayName);
                                return true;
                            }

                            return false;
                        })
                        .map((component) =>
                            actions.createData(
                                `${component.displayName}.json`,
                                JSON.stringify({ props: component.props, description: component.description }),
                            ),
                        );
                },
            };
        },
        function aliasPlugin() {
            return {
                name: 'docusaurus-plugin-aliases',
                configureWebpack() {
                    return {
                        resolve: {
                            symlinks: false,
                            alias: {
                                react: path.resolve(__dirname, 'node_modules', 'react'),
                                'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
                                'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
                            },
                        },
                    };
                },
            };
        },
    ],
};
