// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const lightCodeTheme = require('prism-react-renderer/themes/github');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const globby = require('globby');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const docgen = require('react-docgen-typescript');

const { PR_NAME } = process.env;
const prefix = PR_NAME ? `/${PR_NAME}` : '';
const suffix = 'ui/';
const baseUrl = `${prefix}/${suffix}`;

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: 'Plasma UI',
    tagline: 'Дизайн-система для разработки смартапов.',
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
                    docId: 'intro',
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
                            to: '/',
                        },
                        {
                            label: 'Plasma Web',
                            to: `https://plasma.sberdevices.ru${prefix}/web/`,
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
            disableSwitch: true,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/sberdevices/plasma/blob/master/website/plasma-ui-docs/',
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
                            await globby([
                                '../../packages/plasma-ui/src/**/*.{ts,tsx}',
                                '!../../packages/plasma-ui/src/**/*.test.*',
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
                    content
                        .filter((module) => {
                            return (
                                /^[A-Z]/.test(module.displayName) &&
                                (module.props || module.description) &&
                                module.displayName !== 'Default'
                            );
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
