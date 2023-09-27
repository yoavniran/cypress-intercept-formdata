// const env = process.env.BABEL_ENV;

module.exports = {
	presets: [
		[
			"@babel/env",
			{
				"modules": false,
				targets: {
					node: true,
				},
			},
		],
	],
	plugins: [
		"@babel/plugin-proposal-export-default-from",
	],
	env: {
		test: {
			presets: [
				[
					"@babel/env",
					{
						targets: {
							node: true,
						},
					},
				],
			],
			plugins: [
				"@babel/plugin-proposal-export-default-from",
				"@babel/plugin-transform-runtime",
				"istanbul"
			],
		},
	}
};
