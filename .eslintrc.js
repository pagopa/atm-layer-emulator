module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
		"node": true,
    },
    parser: '@typescript-eslint/parser',
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier'
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "ecmaFeatures": {
			"jsx": true,
		},
        project: 'tsconfig.json',
        "sourceType": "module"
    },
    plugins: ["@typescript-eslint", "react", "react-hooks", "import", "functional", "sonarjs"],
    "rules": {
        "no-prototype-builtins": "off",
		"react/prop-types": "off",
		"react/display-name": "off",
		"react/no-children-prop": "off",
		"array-callback-return": "error",
		"no-mixed-spaces-and-tabs": "off",
		"indent": [
			"error",
			"tab",
		],
		"quotes": [
			"error",
			"double",
		],
		"semi": [
			"error",
			"always",
		],
        'no-case-declarations': 'off',
        'no-inner-declarations': 'off',
        'prefer-const': 'error',
        curly: 'error',
        'spaced-comment': ['error', 'always', { block: { balanced: true } }],
        radix: 'error',
        'one-var': ['error', 'never'],
        'object-shorthand': 'error',
        'no-var': 'error',
        'no-param-reassign': 'error',
        'no-underscore-dangle': 'error',
        'no-undef-init': 'error',
        'no-throw-literal': 'error',
        'no-new-wrappers': 'error',
        'no-eval': 'error',
        'no-console': 0, // TODO: to restore after development ['error', { allow: ['error', 'warn'] }],
        'no-caller': 'error',
        'no-bitwise': 'error',
        eqeqeq: ['error', 'smart'],
        'max-classes-per-file': ['error', 1],
        'guard-for-in': 'error',
        complexity: 'error',
        'arrow-body-style': 'error',
        'import/order': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        // Enable if we want to enforce the return type for all the functions
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        // TODO: added for compatibility. Removing this line we have to remove all the any usage in the code
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'generic',
          },
        ],
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ],
        '@typescript-eslint/no-floating-promises': 'error',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': ['error'],
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        semi: 'off',
        '@typescript-eslint/semi': ['error'],
        '@typescript-eslint/unified-signatures': 'error',
        'react/jsx-key': 'error',
        'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
        'react-hooks/rules-of-hooks': 'warn',
        'functional/no-let': 'error',
        'functional/immutable-data': 'error',
        'sonarjs/no-small-switch': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-nested-template-literals': 'warn',
        '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off'
    },
    settings: {
        react: {
          version: 'detect',
        },
      },
}
