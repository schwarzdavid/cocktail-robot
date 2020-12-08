module.exports = {
    root: true,
    env: {node: true},
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/airbnb',
        '@vue/typescript/recommended'
    ],
    parserOptions: {ecmaVersion: 2020},
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4],
        'space-before-function-paren': ['error', 'never'],
        'space-before-blocks': ['error', 'always'],
        quotes: ['error', 'single'],
        'object-curly-spacing': ['error', 'never'],
        'object-curly-newline': ['error', {
            ObjectExpression: {minProperties: 2},
            ObjectPattern: {
                multiline: true,
                minProperties: 3
            },
            ImportDeclaration: 'never',
            ExportDeclaration: {
                multiline: true,
                minProperties: 2
            }
        }],
        'vue/script-indent': ['error', 4, {
            baseIndent: 1,
            switchCase: 1,
            ignores: []
        }],
        'linebreak-style': ['error', 'windows'],
        'max-len': ['warn', 120],
        'import/prefer-default-export': 'off',
        'import/no-default-export': ['error'],
        'import/extensions': ['error', 'never', {vue: 'always'}],
        'import/no-unresolved': 'off',
        'comma-dangle': ['error', 'never'],
        'no-trailing-spaces': ['warn'],
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
        'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
        'arrow-parens': ['warn', 'as-needed'],
        'spaced-comment': 'off',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error'
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
                'import/prefer-default-export': ['error'],
                'import/no-default-export': 'off'
            }
        },
        {
            files: ['*.d.ts'],
            rules: {
                'import/prefer-default-export': ['error'],
                'import/no-default-export': 'off'
            }
        }
    ]
};
