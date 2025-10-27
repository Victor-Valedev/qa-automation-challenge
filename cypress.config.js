const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // URL base da aplicação
    baseUrl: "https://seubarriga.wcaquino.me",
    
    setupNodeEvents(on, config) {
    },
  },
});

