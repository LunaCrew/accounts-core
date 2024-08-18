import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    supportFile: 'test/e2e/cypress/support/e2e.ts',
    specPattern: 'test/e2e/cypress/e2e/*cy.ts',
    baseUrl: 'http://localhost:3000',
    fixturesFolder: false,
    testIsolation: true
  }
})
