const path = require('path');

module.exports = {
  lintOnSave: false,
  publicPath: '/theMovie/',
  outputDir: './docs',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_styles.scss"
        ;`,
      },
    }
  }
}