import path from "node:path";
import { UserConfigExport } from "vite";
import dts from "vite-plugin-dts";

function base(...dirs: string[]) {
	return path.join(__dirname, ...dirs);
}

export default {
	resolve: {
		alias: [
			{
				find: /#(.+)/,
				replacement: base("$1"),
			},
		],
	},
	build: {
		ssr: true,
		target: "esnext",
		emptyOutDir: true,
		outDir: "dist",
		rollupOptions: {
			input: {
				index: "./src/index.ts",
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
		minify: "terser",
		sourcemap: "hidden",
	},
	plugins: [dts()],
} as UserConfigExport;
