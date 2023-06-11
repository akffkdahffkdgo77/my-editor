module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['react-app', 'airbnb', 'prettier', 'plugin:react/recommended', 'plugin:prettier/recommended', 'plugin:react/jsx-runtime'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: '12',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    ignorePatterns: ['node_modules/', 'serviceWorker.js', 'setupTests.js'],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src']
            }
        }
    },
    rules: {
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-nested-ternary': 'off',
        'react/prop-types': 'off',
        'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type'],
                pathGroups: [
                    {
                        pattern: '{react*,react*/**}',
                        group: 'builtin',
                        position: 'before'
                    },
                    {
                        pattern: 'lib/**',
                        group: 'internal',
                        position: 'before'
                    },
                    {
                        pattern: '{styles/**,*.+(css|scss)}',
                        patternOptions: {
                            dot: true,
                            nocomment: true,
                            matchBase: true
                        },
                        group: 'object',
                        position: 'after'
                    }
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                },
                warnOnUnassignedImports: true
            }
        ]
    }
};
