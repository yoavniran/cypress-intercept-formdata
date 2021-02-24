const env = process.env.BABEL_ENV;

module.exports = {
	presets: [
		[
			"@babel/env",
			{
                "modules": "commonjs"
			},
		],
	],
	plugins: [
	],
};
