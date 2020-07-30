/* eslint-disable prefer-template */
/**
 * Generates set of css custom properties.
 *
 * Example:
 * ```
 * :root {
 * --color-base-warning: #ef6b25;
 * --color-base-critical: #ef6b25;
 * }
 * ```
 */
import { paramCase } from 'change-case';

import { DictionaryProperty, Dictionary } from '../typings';
import { header } from '../lib/header';

export const cssProperty = (prop: DictionaryProperty, tab = 2) => {
    let part = '';
    const tablulation = Array(tab).fill(' ').join('');

    if (prop.comment) part += `${tablulation}/** ${prop.comment} */\n`;

    part += `${tablulation}--${paramCase(prop.name)}: ${prop.value};`;

    return part;
};

const template = (dictionary: Dictionary) => `:root {
${dictionary.allProperties.map((p) => cssProperty(p)).join('\n')}
}
`;

export const formatter = () => ({
    name: 'css-custom-properties',
    formatter: (dictionary: Dictionary) => header() + template(dictionary),
});

interface FormatterConfigOptions {
    category: string;
    type: string;
    destination: string;
}

export const config = ({ destination, category, type }: FormatterConfigOptions) => ({
    format: 'css-custom-properties',
    destination,
    filter: {
        attributes: {
            category,
            type,
        },
    },
});
