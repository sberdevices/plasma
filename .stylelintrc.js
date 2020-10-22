module.exports = {
    plugins: ['stylelint-order', 'stylelint-prettier'],
    processors: ['stylelint-processor-styled-components'],
    extends: ['stylelint-config-styled-components'],
    rules: {
        'prettier/prettier': true,
        'max-nesting-depth': 4,

        'color-hex-case': 'lower',
        'color-hex-length': 'short',
        'color-named': 'never',
        'color-no-hex': null,
        'color-no-invalid-hex': true,

        'font-family-name-quotes': 'always-where-recommended',
        'font-family-no-duplicate-names': true,
        'font-family-no-missing-generic-family-keyword': [true, { ignoreFontFamilies: 'a' }],
        'font-weight-notation': 'named-where-possible',

        'function-blacklist': [],
        'function-calc-no-unspaced-operator': true,
        'function-comma-newline-after': 'always-multi-line',
        'function-comma-newline-before': 'never-multi-line',
        'function-comma-space-after': 'always',
        'function-comma-space-before': 'never',
        'function-linear-gradient-no-nonstandard-direction': true,
        'function-max-empty-lines': 0,
        'function-name-case': 'lower',
        'function-parentheses-newline-inside': 'never-multi-line',
        'function-parentheses-space-inside': 'never',
        'function-url-quotes': 'always',
        'function-url-scheme-whitelist': ['https'],
        // правила whitelist и blacklist взаимоисключающие
        // "function-url-scheme-blacklist": ["data"],
        'function-whitelist': null,
        'function-whitespace-after': 'always',

        'number-leading-zero': 'always',
        'number-max-precision': 3,
        'number-no-trailing-zeros': true,

        'string-no-newline': true,
        'string-quotes': 'single',

        'time-min-milliseconds': 100,

        'unit-blacklist': [],
        'unit-case': 'lower',
        'unit-no-unknown': true,

        'value-keyword-case': null,
        'value-no-vendor-prefix': null,

        'value-list-comma-newline-after': 'always-multi-line',
        'value-list-comma-newline-before': 'never-multi-line',
        'value-list-comma-space-after': 'always',
        'value-list-comma-space-before': 'never',
        'value-list-max-empty-lines': 0,

        'shorthand-property-no-redundant-values': true,

        'property-blacklist': [],
        'property-case': 'lower',
        'property-no-unknown': true,
        'property-no-vendor-prefix': null,

        'keyframe-declaration-no-important': true,

        'declaration-bang-space-after': 'never',
        'declaration-bang-space-before': 'always',
        'declaration-colon-newline-after': null,
        'declaration-colon-space-after': null,
        'declaration-colon-space-before': 'never',
        // "declaration-no-important": true,
        'declaration-property-unit-blacklist': {},
        'declaration-property-value-blacklist': {},
        'declaration-block-no-duplicate-properties': [true, { ignore: ['consecutive-duplicates'] }],
        'declaration-block-no-redundant-longhand-properties': [true, { ignoreShorthands: ['/flex-/'] }],
        'declaration-block-no-shorthand-property-overrides': true,
        'declaration-block-semicolon-newline-after': 'always',
        'declaration-block-semicolon-newline-before': 'never-multi-line',
        'declaration-block-semicolon-space-after': 'always-single-line',
        'declaration-block-semicolon-space-before': 'never',
        'declaration-block-single-line-max-declarations': 1,
        'declaration-block-trailing-semicolon': 'always',

        'block-closing-brace-empty-line-before': 'never',
        'block-closing-brace-newline-after': 'always',
        'block-no-empty': true,
        'block-opening-brace-newline-after': 'always',
        'block-closing-brace-newline-before': 'always',
        'block-opening-brace-space-before': 'always',

        'selector-attribute-brackets-space-inside': 'never',
        'selector-combinator-space-after': 'always',
        'selector-combinator-space-before': 'always',
        'selector-max-universal': 0,
        'selector-max-id': 0,
        'selector-nested-pattern': '^&(?:(.+))$',
        'selector-pseudo-class-case': 'lower',
        'selector-pseudo-class-no-unknown': true,
        'selector-pseudo-class-parentheses-space-inside': 'never',
        'selector-pseudo-element-case': 'lower',
        'selector-pseudo-element-colon-notation': 'double',
        'selector-pseudo-element-no-unknown': true,
        'selector-type-case': ['lower', { ignoreTypes: ['/^\\$\\w./'] }],
        'selector-type-no-unknown': [true, { ignoreTypes: ['/^[$]/'] }],
        'selector-max-empty-lines': 0,

        'selector-list-comma-newline-after': null,
        'selector-list-comma-newline-before': 'never-multi-line',
        // бесполезно, если `selector-list-comma-newline-after: "always"`
        // "selector-list-comma-space-after": "always-single-line",
        'selector-list-comma-space-before': 'never',

        'rule-empty-line-before': [
            'always',
            {
                except: ['first-nested'],
                ignore: ['after-comment', 'first-nested'],
            },
        ],

        'media-feature-colon-space-after': 'always',
        'media-feature-colon-space-before': 'never',
        'media-feature-name-case': 'lower',
        'media-feature-parentheses-space-inside': 'never',
        'media-feature-range-operator-space-after': 'always',
        'media-feature-range-operator-space-before': 'always',

        'media-query-list-comma-newline-after': 'always-multi-line',
        'media-query-list-comma-space-after': 'always-single-line',

        'at-rule-empty-line-before': [
            'always',
            {
                except: ['first-nested', 'blockless-after-same-name-blockless'],
                ignore: ['after-comment'],
            },
        ],
        'at-rule-name-case': 'lower',
        'at-rule-name-space-after': 'always',
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['for', 'mixin', 'define-mixin', 'media', 'mixin-content', 'each'],
            },
        ],
        'at-rule-semicolon-newline-after': 'always',

        'comment-no-empty': true,
        'comment-whitespace-inside': 'always',

        indentation: 4,
        linebreaks: 'unix',
        'max-line-length': 120,
        'max-empty-lines': 1,
        'no-descending-specificity': true,
        'no-duplicate-selectors': true,
        'no-empty-source': null,
        'no-eol-whitespace': true,
        'no-extra-semicolons': true,
        'no-invalid-double-slash-comments': true,
        'no-missing-end-of-source-newline': true,
        'no-empty-first-line': true,
        'no-unknown-animations': true,

        'order/order': [
            'dollar-variables',
            'custom-properties',
            'declarations',
            { type: 'at-rule' },
            { type: 'at-rule', hasBlock: true },
            'rules',
        ],
        'order/properties-order': null,
    },
};
