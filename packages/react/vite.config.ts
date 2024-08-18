import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '~',
                replacement: fileURLToPath(new URL('./src', import.meta.url)),
            },
            {
                find: '@shared',
                replacement: fileURLToPath(new URL('../shared/src', import.meta.url)),
            }
        ],
    },
});
