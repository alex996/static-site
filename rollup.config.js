import copy from 'rollup-plugin-copy'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    resolve(),
    copy({
      'index.html': 'dist/index.html'
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    production && terser()
  ]
}
