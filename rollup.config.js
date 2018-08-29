/* eslint-env node */
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import bundleSize from 'rollup-plugin-bundle-size';

const env = process.env.NODE_ENV;
const config = {
  input: 'src/index.mjs',
  plugins: []
};

if (env === 'es') {
  config.output = { format: env };
}

if (env === 'umd' || env === 'umd:min') {
  config.output = {
    format: 'umd',
    name: 'tili'
  };
  config.plugins.push(
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  );
}

if (env === 'umd:min') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

config.plugins.push(bundleSize());

export default config;
