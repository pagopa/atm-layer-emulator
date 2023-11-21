module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true,
		},
		"ecmaVersion": 12,
		"sourceType": "module",
	},
	"plugins": [
		"react",
	],
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
		]
	},
	settings: {
		react: {
		 version: "detect",
		},
	  },
};
