import { defineConfig } from 'vitest/config';

export default defineConfig({
  sequence: {
    concurrent: true,
  },
  test: {
    testTimeout: 60_000,
  },
});
