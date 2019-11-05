import resolve from 'rollup-plugin-node-resolve'
import VuePlugin from 'rollup-plugin-vue'
import sass from 'rollup-plugin-sass'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-copy-plugin'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/lib/index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true
  },
  external: ['vue'],
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    commonjs(),
    sass({ insert: true }),
    VuePlugin(),
    terser({
      compress: {
        ecma: 6,
        module: true,
        toplevel: true
      }
    }),
    copy({
      'src/lib/scss/_mixin.scss': 'dist/scss/_mixin.scss',
      'src/lib/style/normalize-8.0.0.css': 'dist/style/normalize-8.0.0.css'
    })
  ]
}
