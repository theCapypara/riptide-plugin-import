// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    emptyOutDir: true,
    outDir: path.resolve(__dirname, '../riptide_plugin_import/tpl/wizard-dist/'),
    lib: {
      entry: path.resolve(__dirname, 'main.js'),
      name: 'RiptideWizard',
      formats: ["es"],
      fileName: (_) => `wizard.js`
    }
  }
})
