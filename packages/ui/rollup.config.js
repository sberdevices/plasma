/* eslint-disable */

import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';

export default {
    input: './src/index.ts',
    output: {
        dir: './core',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [url(), typescript()],
    externals: ['react', 'react-dom', 'styled-components'],
};
