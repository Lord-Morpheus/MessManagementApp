import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig(() => {
  return {
    define: {
      // eslint-disable-next-line no-undef
      __APP_ENV__: process.env.VITE_BACKEND_URI,
    },
    plugins: [react()],
  };
});