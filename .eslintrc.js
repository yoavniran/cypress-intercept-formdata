module.exports = {
	"parser": "@babel/eslint-parser",
	"env": {
		"es6": true,
		"node": true,
		"jest": true,
		"browser": true,
		"commonjs": true,
	},
	"extends": [
		"eslint:recommended",
	],
	"plugins": [],
	"globals": {
		"ENV": true,
	},
	"settings": {
		"import/core-modules": [
			"fs",
			"path",
			"os",
		],
	},
	"rules": {
		"quotes": [
			2,
			"double",
			{
				"allowTemplateLiterals": true,
			},
		],
		"strict": 0,
		"no-unused-vars": [
			2,
			{
				"vars": "all",
				"args": "none",
			},
		],
		"eqeqeq": 2,
		"no-var": 2,
		"no-process-exit": 0,
		"no-underscore-dangle": 0,
		"no-loop-func": 0,
		"no-console": 2,
		"key-spacing": 0,
		"no-mixed-spaces-and-tabs": [
			2,
			"smart-tabs",
		],
		"semi": [
			2,
			"always",
		],
		"no-trailing-spaces": [
			2,
			{
				"skipBlankLines": false,
			},
		],
		"camelcase": [
			1,
			{
				"properties": "never",
			},
		],
		"curly": 2,
		"object-curly-spacing": [
			2,
			"always",
		],
		"no-duplicate-imports": 0,
		"import/no-unresolved": 0,
		"import/no-named-as-default": 0,
		"import/extensions": 0,
		"import/no-dynamic-require": 0,
		"import/prefer-default-export": 0,
		"import/no-webpack-loader-syntax": 0,
		"max-len": [
			2,
			155,
		],
	},
	"overrides": [
		{
			"files": ["*.test.js"],
			"globals": {
				"vi": false,
			},
			"extends": [
				"plugin:vitest/recommended",
			],
			"plugins": [
				"vitest",
			],
			"rules": {
				//TODO: bring back when fixed: https://github.com/veritem/eslint-plugin-vitest/issues/237
				"vitest/valid-expect": 1,
				"vitest/assertion-type": 0,
			},
		},
		{
			"files": ["*.spec.js", "src/index.js"],
			"globals": {
				"Cypress": false,
				"cy": false,
			},
		},
		{
			"files": [
				"*.ts",
				"*.tsx",
			],
			"parser": "@typescript-eslint/parser",
			"parserOptions": {
				"ecmaFeatures": {
					"jsx": true,
				},
				"project": "tsconfig.json",
				"tsconfigRootDir": ".",
			},
			"plugins": [
				"@typescript-eslint",
			],
			"extends": [
				"eslint:recommended",
				"plugin:@typescript-eslint/eslint-recommended",
				"plugin:@typescript-eslint/recommended",
			],
			"rules": {
				"import/no-extraneous-dependencies": 0,
				"@typescript-eslint/no-explicit-any": 0,
				"no-console": 0,
				"no-async/no-async": 0,
			},
		},
	],
};
