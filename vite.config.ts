import path from "path";
import { defineConfig } from "vite";

function base(...dirs: string[]) {
	return path.join(__dirname, ...dirs);
}

const prod = process.env.NODE_ENV === "production";

const name = "wjs";

export default defineConfig({
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
		target: "node14",
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
		minify: prod ? "terser" : "esbuild",
		sourcemap: prod ? "hidden" : "inline",
	},
});
