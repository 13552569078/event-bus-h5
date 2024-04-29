import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import postcssPxToViewport from "postcss-px-to-viewport";
import DefineOptions from 'unplugin-vue-define-options/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers';
import EnvironmentPlugin from 'vite-plugin-environment'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: mode !== 'serve' ? `/${env.PROD_PREFIX}` : "/",
    resolve: {
      alias: {
        "normalize-wheel-es": "normalize-wheel-es/dist/index.mjs",
        "async-validator": "async-validator/dist-web/index.js",
        "@": path.resolve(__dirname, "src"),
        "@apis": path.resolve(__dirname, "src/apis"),
        "@store": path.resolve(__dirname, "src/store"),
        "@common": path.resolve(__dirname, "src/common"),
        "@image": path.resolve(__dirname, "src/assets/image"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@vuex": path.resolve(__dirname, "src/vuex")
      }
    },
    server: {
      https: false,
      port: 9346,
      host: "0.0.0.0", // 启动暴露ip地址
      proxy: {
        "/proxyApis": {
          target: "http://10.255.135.149:8580", // 黄陵
          // target: "http://100.66.100.150:5056", // 黄陵
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxyApis/, ""),
        },
      },
    },

    plugins: [
      eslint(),
      EnvironmentPlugin([
        "NODE_ENV",
        "PROD_PREFIX",
        "BASE_URL_WARNING",
        "BASE_URL",
        "API_PREFIX_CENTRE_CONFIG",
        "FILE_SERVICE_HTTP",
        "LOGIN_URL_USER_CENTER",
        "API_PREFIX_USER_CENTER",
        "CLIENT_ID_CENTRE_CONFIG",
        "CALLBACK_URL_CENTRE_CONFIG",
      ]),
      DefineOptions(),
      vue(),
      Components({
        resolvers: [
          VantResolver(),
          (name) => {
            if (name.startsWith('Two') || name.startsWith('Fill') || name.startsWith('File'))
              return { importName: name, path: '@hongluan-ui/icons' }
          }
        ],
      }),
    ],
    css: {
      postcss: {
        plugins: [
          postcssPxToViewport({
            viewportWidth: 375, //1vw = 3.75px
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          charset: false
        }
      }

    },
    build: {
      outDir: "ai-chat-room-h5",
      assetsDir: "./static",
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
    },
  }
})
