const env = process.env.BABEL_ENV;

module.exports = {
	presets: [
		[
			"@babel/env",
			{
				"modules": false,
				"targets": "node 10.0",
			},
		],
	],
	plugins: [
		"@babel/plugin-proposal-export-default-from",
	],
	env: {
		test: {
			plugins: [
				"@babel/plugin-transform-runtime",
				"istanbul"
			],
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
		},
	}
};
