import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [TDesignResolver({
                library: 'vue-next'
            })],
            imports: ["vue", "vue-router"],
            dts: "src/types/auto-imports.d.ts"
            // resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [TDesignResolver({
                library: 'vue-next'
            })],
            // resolvers: [ElementPlusResolver()]
        }),
        // ElementPlus({
        //     useSource: true
        // })
    ],
	resolve: {
        alias:{
            '@': path.resolve(__dirname, './src'),
            "../": path.resolve(__dirname, './src')
        },
    },
    base: '/',
    esbuild: {
        // drop: ['console', 'debugger'],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(name) {
                    if (name.includes('node_modules')) {
                        return 'vendor'
                    }
                    if (name.includes('vue')) {
                        return 'vue-vendor'
                    }
                    if (name.includes('tdesign')) {
                        return 'tdesign-vendor'
                    }
                }
            }
        }
    },
    server: {
        host: '127.0.0.1',
        port: 8848
    }
})
