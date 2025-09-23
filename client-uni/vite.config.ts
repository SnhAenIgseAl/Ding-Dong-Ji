import path from "path";
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		uni({
			vueOptions: {
				script: {
					defineModel: true
				}
			}
		}),
		AutoImport({
			imports: ["vue", "uni-app"],
			dts: "src/types/auto-imports.d.ts"
		})
	],
	base: "./",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	}
});
