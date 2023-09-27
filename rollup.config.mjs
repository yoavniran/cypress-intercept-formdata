import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";

export default {
	input: "src/index.js",
	output: {
		file: "lib/index.js",
		format: "cjs",
	},
	plugins: [nodeResolve(), babel({ babelHelpers: "bundled" })],
};
