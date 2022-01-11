import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        typescript({
            rootDir: './src',
        }),
    ],
    external: ['react'],
};
