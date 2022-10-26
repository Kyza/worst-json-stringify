import { UserConfigExport } from "vite";
import dts from "vite-plugin-dts";

const production = process.env.NODE_ENV === "production";

export default {
	resolve: {
		extensions: [".js", ".ts"],
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
		minify: production ? "terser" : false,
		sourcemap: production ? "hidden" : "inline",
	},
	plugins: [dts()],
} as UserConfigExport;
