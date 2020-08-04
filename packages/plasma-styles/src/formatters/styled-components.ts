/* eslint-disable no-return-assign */
/* eslint-disable prefer-template */
/**
 * Generates styled-components for category type tokens.
 *
 * Example:
 * ```
 * import styled from 'styled-components';
 *
 * import * as tokens from './tokens';
 *
 * export const Button1 = styled.div`
 *   font-size: ${tokens.typoButtonButton1FontSize};
 *   font-style: ${tokens.typoButtonButton1FontStyle};
 *   line-height: ${tokens.typoButtonButton1LineHeight};
 *   font-weight: ${tokens.typoButtonButton1FontWeight};
 *`;
 * ```
 */
import { paramCase, camelCase } from 'change-case';

import { Dictionary, CategoryProperties } from '../typings';
import { header } from '../lib/header';

const imports = (props: FormatterOptions) => `import styled from 'styled-components';

import * as ${props.tokensVariableName} from './${props.tokensVariableName}';\n\n`;

const writeCssProperiesObject = (style: Record<string, string>) => {
    let str = '\n';

    Object.keys(style).forEach((key) => (str += `    ${paramCase(key)}: ${'${' + style[key] + '}'};\n`));

    return str;
};

const typedCssVariable = (categories: CategoryProperties, props: FormatterOptions) => {
    let part = '';

    Object.keys(categories).forEach((categoryName) => {
        Object.keys(categories[categoryName]).forEach((componentName, i) => {
            const style = Object.keys(categories[categoryName][componentName]).reduce(
                (cssProps: Record<string, string>, propName) => {
                    cssProps[propName] = `${props.tokensVariableName}.${camelCase(
                        categories[categoryName][componentName][propName].name,
                    )}`;
                    return cssProps;
                },
                {},
            );

            part += `export const ${componentName} = styled.div\`${writeCssProperiesObject(style)}\`;`;

            if (i !== Object.keys(categories[categoryName]).length - 1) {
                part += '\n\n';
            }
        }, {});
    });

    return part;
};

const template = (dictionary: Dictionary, props: FormatterOptions) =>
    Object.keys(dictionary.properties)
        .map((key) => typedCssVariable(dictionary.properties[key], props))
        .join('\n') + '\n';

interface FormatterOptions {
    tokensVariableName: string;
}

export const formatter = (props: FormatterOptions) => ({
    name: 'styled-components',
    formatter: (dictionary: Dictionary) => header() + imports(props) + template(dictionary, props),
});

interface FormatterConfigOptions {
    category: string;
    type: string;
    destination: string;
}

export const config = ({ category, type, destination }: FormatterConfigOptions) => ({
    format: 'styled-components',
    destination,
    filter: {
        attributes: {
            category,
            type,
        },
    },
});
