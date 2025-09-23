// vite.config.ts
import { defineConfig } from "file:///D:/%E7%BD%91%E6%8A%91%E4%BA%91Time/workspace/ding-dong-ji/manager/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///D:/%E7%BD%91%E6%8A%91%E4%BA%91Time/workspace/ding-dong-ji/manager/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/%E7%BD%91%E6%8A%91%E4%BA%91Time/workspace/ding-dong-ji/manager/node_modules/unplugin-vue-components/dist/vite.js";
import { TDesignResolver } from "file:///D:/%E7%BD%91%E6%8A%91%E4%BA%91Time/workspace/ding-dong-ji/manager/node_modules/@tdesign-vue-next/auto-import-resolver/dist/index.js";
import vue from "file:///D:/%E7%BD%91%E6%8A%91%E4%BA%91Time/workspace/ding-dong-ji/manager/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\\u7F51\u6291\u4E91Time\\workspace\\ding-dong-ji\\manager";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [TDesignResolver({
        library: "vue-next"
      })],
      imports: ["vue", "vue-router"],
      dts: "src/types/auto-imports.d.ts"
      // resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: "vue-next"
      })]
      // resolvers: [ElementPlusResolver()]
    })
    // ElementPlus({
    //     useSource: true
    // })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "../": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  base: "/",
  esbuild: {
    // drop: ['console', 'debugger'],
  },
  server: {
    host: "127.0.0.1",
    port: 8848
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTdGNTFcdTYyOTFcdTRFOTFUaW1lXFxcXHdvcmtzcGFjZVxcXFxkaW5nLWRvbmctamlcXFxcbWFuYWdlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU3RjUxXHU2MjkxXHU0RTkxVGltZVxcXFx3b3Jrc3BhY2VcXFxcZGluZy1kb25nLWppXFxcXG1hbmFnZXJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LyVFNyVCRCU5MSVFNiU4QSU5MSVFNCVCQSU5MVRpbWUvd29ya3NwYWNlL2RpbmctZG9uZy1qaS9tYW5hZ2VyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgVERlc2lnblJlc29sdmVyIH0gZnJvbSAnQHRkZXNpZ24tdnVlLW5leHQvYXV0by1pbXBvcnQtcmVzb2x2ZXInO1xyXG4vLyBpbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG4vLyBpbXBvcnQgRWxlbWVudFBsdXMgZnJvbSAndW5wbHVnaW4tZWxlbWVudC1wbHVzL3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuXHJcbi8vIGh0dHBzOi8vdml0ZS5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHZ1ZSgpLFxyXG4gICAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgICAgICByZXNvbHZlcnM6IFtURGVzaWduUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICAgICAgbGlicmFyeTogJ3Z1ZS1uZXh0J1xyXG4gICAgICAgICAgICB9KV0sXHJcbiAgICAgICAgICAgIGltcG9ydHM6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIl0sXHJcbiAgICAgICAgICAgIGR0czogXCJzcmMvdHlwZXMvYXV0by1pbXBvcnRzLmQudHNcIlxyXG4gICAgICAgICAgICAvLyByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgICAgICByZXNvbHZlcnM6IFtURGVzaWduUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICAgICAgbGlicmFyeTogJ3Z1ZS1uZXh0J1xyXG4gICAgICAgICAgICB9KV0sXHJcbiAgICAgICAgICAgIC8vIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV1cclxuICAgICAgICB9KSxcclxuICAgICAgICAvLyBFbGVtZW50UGx1cyh7XHJcbiAgICAgICAgLy8gICAgIHVzZVNvdXJjZTogdHJ1ZVxyXG4gICAgICAgIC8vIH0pXHJcbiAgICBdLFxyXG5cdHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczp7XHJcbiAgICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICAgICAgICAgIFwiLi4vXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBiYXNlOiAnLycsXHJcbiAgICBlc2J1aWxkOiB7XHJcbiAgICAgICAgLy8gZHJvcDogWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgaG9zdDogJzEyNy4wLjAuMScsXHJcbiAgICAgICAgcG9ydDogODg0OFxyXG4gICAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStVLFNBQVMsb0JBQW9CO0FBQzVXLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsdUJBQXVCO0FBR2hDLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFQakIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1AsV0FBVyxDQUFDLGdCQUFnQjtBQUFBLFFBQ3hCLFNBQVM7QUFBQSxNQUNiLENBQUMsQ0FBQztBQUFBLE1BQ0YsU0FBUyxDQUFDLE9BQU8sWUFBWTtBQUFBLE1BQzdCLEtBQUs7QUFBQTtBQUFBLElBRVQsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1AsV0FBVyxDQUFDLGdCQUFnQjtBQUFBLFFBQ3hCLFNBQVM7QUFBQSxNQUNiLENBQUMsQ0FBQztBQUFBO0FBQUEsSUFFTixDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJTDtBQUFBLEVBQ0gsU0FBUztBQUFBLElBQ0YsT0FBTTtBQUFBLE1BQ0YsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLE9BQU8sS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUMxQztBQUFBLEVBQ0o7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQTtBQUFBLEVBRVQ7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNWO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
