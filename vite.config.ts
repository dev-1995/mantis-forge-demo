import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'mantis-forge',
            fileName: (format) => `mantis-forge.${format}.js`,
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['express', 'pg', 'jsonwebtoken', 'winston', 'dotenv'],
            plugins: [nodeResolve()],
            output: {
                globals: {
                    // Define global variables for external dependencies if needed
                },
            },
        },
        sourcemap: true,
        target: 'esnext',
    },
    plugins: [dts()],
    resolve: {
        alias: {
            'require': 'module',
        },
    },

});
