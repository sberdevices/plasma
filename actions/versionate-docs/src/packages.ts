export const associatedDocs: Record<string, string> = {
    'plasma-ui': 'plasma-ui-docs',
    'plasma-web': 'plasma-web-docs',
    'plasma-temple': 'plasma-temple-docs',
    'plasma-ui-docs': 'plasma-ui-docs',
    'plasma-web-docs': 'plasma-web-docs',
    'plasma-temple-docs': 'plasma-temple-docs',
    // Исключим, т.к. не понятно, что делать с ним - версия отличатся от web
    // В будущем, скорее всего, придется выравнить версии b2c и b2b (web)
    // 'plasma-b2c': 'plasma-web-docs'
};

export const associatedPackages: Record<string, string> = {
    'plasma-ui-docs': 'plasma-ui',
    'plasma-web-docs': 'plasma-web',
    'plasma-temple-docs': 'plasma-temple',
};

export const associatedPrefixes: Record<string, string> = {
    'plasma-ui-docs': 'ui',
    'plasma-web-docs': 'web',
    'plasma-temple-docs': 'temple',
};
