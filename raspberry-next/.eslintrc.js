const warnInDevMode = process.env.NODE_ENV === 'production' ? 'off' : 'warn'
const errorInProdMode = process.env.NODE_ENV === 'production' ? 'error' : 'warn'

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'arrow-parens': ['warn', 'as-needed'],
        'comma-dangle': ['error', 'never'],
        'import/extensions': ['error', 'never', {
            vue: 'always',
            json: 'always'
        }],
        'import/no-default-export': ['warn'],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        indent: ['warn', 4],
        'linebreak-style': ['error', 'windows'],
        'lines-between-class-members': ['error', 'always', {
            exceptAfterSingleLine: true
        }],
        'max-len': ['warn', 120],
        'no-console': [warnInDevMode, {
            allow: ['warn', 'error']
        }],
        'no-debugger': errorInProdMode,
        'no-trailing-spaces': ['warn'],
        'no-unused-vars': 'off',
        'object-curly-spacing': ['error', 'never'],
        'padded-blocks': 'off',
        quotes: ['error', 'single'],
        'space-before-function-paren': ['error', 'never'],
        'space-before-blocks': ['error', 'always'],
        'spaced-comment': 'off',
        'vue/array-bracket-spacing': 'error',
        'vue/arrow-spacing': 'error',
        'vue/block-spacing': 'error',
        'vue/brace-style': 'error',
        'vue/camelcase': 'error',
        'vue/comma-dangle': ['error', 'always-multiline'],
        'vue/component-definition-name-casing': 'error',
        'vue/component-name-in-template-casing': 'error',
        'vue/component-tags-order': ['error', {
            order: ['template', 'script', 'style']
        }],
        'vue/dot-location': 'error',
        'vue/eqeqeq': 'error',
        'vue/key-spacing': 'error',
        'vue/keyword-spacing': 'error',
        'vue/match-component-file-name': 'error',
        'vue/max-len': ['warn', 120],
        'vue/no-boolean-default': 'error',
        'vue/no-deprecated-scope-attribute': 'error',
        'vue/no-deprecated-slot-attribute': 'error',
        'vue/no-deprecated-slot-scope-attribute': 'error',
        'vue/no-empty-pattern': 'error',
        'vue/no-irregular-whitespace': 'error',
        'vue/no-reserved-component-names': 'error',
        'vue/no-restricted-syntax': 'error',
        'vue/no-static-inline-styles': 'error',
        'vue/no-unsupported-features': 'error',
        'vue/object-curly-spacing': ['error', 'never'],
        'vue/padding-line-between-blocks': 'error',
        'vue/require-name-property': 'warn',
        'vue/html-indent': ['warn', 4],
        'vue/space-infix-ops': 'error',
        'vue/space-unary-ops': 'error',
        'vue/static-class-names-order': 'off',
        'vue/v-on-function-call': 'error',
        'vue/v-slot-style': 'error',
        'vue/valid-v-bind-sync': 'error',
        'vue/valid-v-slot': 'error',
        'vue/max-attributes-per-line': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-self-closing': 'off',
        'vue/require-direct-export': 'off',
        'vue/singleline-html-element-content-newline': ['warn', {
            ignoreWhenNoAttributes: true,
            ignoreWhenEmpty: true
        }],
        'vue/script-indent': ['error', 4, {
            baseIndent: 1,
            switchCase: 1,
            ignores: []
        }],
        'vue/attributes-order': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'comma',
                requireLast: false
            },
            singleline: {
                delimiter: 'comma',
                requireLast: false
            }
        }],
        '@typescript-eslint/explicit-module-boundary-types': ['warn', {
            allowTypedFunctionExpressions: true
        }]
    },
    overrides: [
        {
            files: ['*.vue', '*.d.ts'],
            rules: {
                indent: 'off',
                'import/prefer-default-export': ['error'],
                'import/no-default-export': 'off'
            }
        }
    ]
}
