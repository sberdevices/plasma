/* eslint-disable prefer-template */
/**
 * Generates styled-component with global style for theming.
 *
 * Example:
 * ```
 * import { createGlobalStyle } from 'styled-components';
 *
 * export default createGlobalStyle`
 *   :root {
 *       --color-base-primary: #0f6fdf;
 *       --color-base-warning: #ef6b25;
 *       --color-base-critical: #ef6b25;
 *   }
 *`;
 * ```
 */
import { Dictionary } from '../typings';
import { header } from '../lib/header';

import { themedCssProperty } from './css-theme-properties';

const template = (dictionary: Dictionary) => `import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle\`
    :root {
${dictionary.allProperties.map((p) => themedCssProperty(p, 8)).join('\n')}
    }
\`;
`;

export const formatter = () => ({
    name: 'styled-theme-style',
    formatter: (dictionary: Dictionary) => header() + template(dictionary),
});

interface FormatterConfigOptions {
    category: string;
    type: string;
    destination: string;
}

export const config = ({ destination, category, type }: FormatterConfigOptions) => ({
    format: 'styled-theme-style',
    destination,
    filter: {
        attributes: {
            category,
            type,
        },
    },
});
