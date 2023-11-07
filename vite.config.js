import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import styleImport from 'vite-plugin-style-import'
import path from 'path'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), styleImport(
    {
      libs: [
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: (name) => {
            return `zarm/es/${name}/style/css`;
          },
        }
      ]
    }
  )],
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 路径
      'config': path.resolve(__dirname, 'src/config') // src 路径
    }
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       // 当遇到 /api 路径时，将其转换成 target 的值
  //       target: 'http://47.99.134.126:7009',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
  //     }
  //   }
  // }
  server: {
    // https: true,
    proxy: {
      // https: {
      //   key: fs.readFileSync('./key.pem'),
      //   cert: fs.readFileSync('./cert.pem'),
      // },
      host: '0.0.0.0',
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://101.34.151.30:7002/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''), // 将 /api 重写为空,
        secure: false,
      }
    }
  },
})
