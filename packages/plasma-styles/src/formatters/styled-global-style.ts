/* eslint-disable prefer-template */
/**
 * Generates styled-component with global style.
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

import { cssProperty } from './css-custom-properties';

const template = (dictionary: Dictionary) => `import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle\`
    :root {
${dictionary.allProperties.map((p) => cssProperty(p, 8)).join('\n')}
    }
\`;
`;

export const formatter = () => ({
    name: 'styled-global-style',
    formatter: (dictionary: Dictionary) => header() + template(dictionary),
});

interface FormatterConfigOptions {
    category: string;
    type: string;
    destination: string;
}

export const config = ({ destination, category, type }: FormatterConfigOptions) => ({
    format: 'styled-global-style',
    destination,
    filter: {
        attributes: {
            category,
            type,
        },
    },
});
