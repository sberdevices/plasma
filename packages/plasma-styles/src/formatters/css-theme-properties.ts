/* eslint-disable prefer-template */
import { DictionaryProperty, Dictionary } from '../typings';
import { header } from '../lib/header';

export const themedCssProperty = (prop: DictionaryProperty, tab = 2) => {
    let part = '';
    const tablulation = Array(tab).fill(' ').join('');

    if (prop.comment) part += `${tablulation}/** ${prop.comment} */\n`;
    if (prop.original.value.startsWith('{') && prop.original.value.endsWith('}')) {
        part += `${tablulation}/** Inefered from ${prop.original.value.replace('{', '').replace('}', '')} */\n`;
    }

    const value = prop.original.value.includes('rgb') ? prop.original.value : prop.value;

    part += `${tablulation}--${`${prop.attributes.type}-${prop.attributes.item}-${prop.attributes.subitem}`}: ${value};`;

    return part;
};

const template = (dictionary: Dictionary) => `:root {
${dictionary.allProperties.map((p) => themedCssProperty(p)).join('\n')}
}
`;

export const formatter = () => ({
    name: 'css-themed-properties',
    formatter: (dictionary: Dictionary) => header() + template(dictionary),
});

interface FormatterConfigOptions {
    category: string;
    destination: string;
}

export const config = ({ destination, category }: FormatterConfigOptions) => ({
    format: 'css-themed-properties',
    destination,
    filter: {
        attributes: {
            category,
        },
    },
});
