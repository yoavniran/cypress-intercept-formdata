/// <reference types="vitest" />
import { defineConfig } from "vite";
import babelPlugin from "vite-plugin-babel";

export default defineConfig({
	plugins: [
		babelPlugin({
			//passing specific config because setup file breaks when using config file
			babelConfig: {
				babelrc: false,
				configFile: false,
				plugins: ["@babel/plugin-proposal-export-default-from"],
			},
		}),
	],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./vitest-setup.js",
		include: ["**/*.test.js"],
		coverage: {
			reporter: ["text", "json", "html"],
			lines: 99,
			branches: 99,
			functions: 99,
			statements: 99,
			perFile: true,
		},
	},
});
