import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ['@apollo/client', 'graphql']
  },
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  }
});
