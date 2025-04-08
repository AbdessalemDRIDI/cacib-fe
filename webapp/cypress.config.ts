import { defineConfig } from 'cypress';

export default defineConfig({
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  video: false,
  videosFolder: 'dist/cypress/videos',
  screenshotsFolder: 'dist/cypress/screenshots',
  chromeWebSecurity: false,
  viewportWidth: 1200,
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
  },
  e2e: {
    supportFile: 'cypress/support/command.ts',
    specPattern: 'cypress/**/*.spec.ts',
  },
});
