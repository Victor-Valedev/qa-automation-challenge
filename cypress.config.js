const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true, // grava vídeos automaticamente durante o run
  videosFolder: "cypress/videos", // pasta onde os vídeos serão salvos

  viewportWidth: 1366, // largura da tela
  viewportHeight: 768,  // altura da tela

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: false,
    json: true
  },

  e2e: {
    defaultCommandTimeout: 10000, //aumenta tempo padrão de espera para comandos
    baseUrl: "https://seubarriga.wcaquino.me", // URL base da aplicação
    pageLoadTimeout: 60000, // tempo máximo para carregamento de página
    setupNodeEvents(on, config) {
      // eventos e hooks futuros, se necessário
    },
  },
});


