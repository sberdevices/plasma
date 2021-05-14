import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import image from '@rollup/plugin-image';
import typescript from 'rollup-plugin-typescript2';

const outDir = 'dist';

export default {
    input: 'src/index.ts',
    output: {
        dir: outDir,
        format: 'es',
        sourcemap: true,
    },
    plugins: [nodeResolve(), commonjs(), peerDepsExternal(), image(), typescript({ tsconfig: 'tsconfig.build.json' })],
};
