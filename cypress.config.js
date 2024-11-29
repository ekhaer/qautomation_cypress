const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/example/*.js', // Fixed placement and added missing comma
    env: {
      greenkartURL: "https://rahulshettyacademy.com/seleniumPractise/#/"
    }
  },
});
