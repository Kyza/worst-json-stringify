import * as path from "node:path";
import { UserConfigExport } from "vite";
import dts from "vite-plugin-dts";

function base(...dirs: string[]) {
	return path.join(__dirname, ...dirs);
}

const name = "wjs";

export default {
	resolve: {
		alias: [
			{ find: `#${name}`, replacement: base("src") },
			{
				find: new RegExp(`#${name}/(.+)`),
				replacement: base("src", "$1"),
			},
		],
	},
	build: {
		ssr: true,
		target: "esnext",
		outDir: "dist",
		rollupOptions: {
			input: {
				index: "src/index.ts",
			},
			output: {
				entryFileNames: (chunkInfo) => {
					// Make sure entries in `input` are index.js files.
					if (chunkInfo.isEntry) {
						return "index.js";
					}
					// Otherwise use the default name.
					return `${chunkInfo.name}.js`;
				},
				preserveModules: true,
				preserveModulesRoot: "src",
				format: "esm",
				exports: "named",
			},
			preserveEntrySignatures: "strict",
		},
		minify: false,
		sourcemap: "hidden",
	},
	plugins: [dts()],
} as UserConfigExport;
