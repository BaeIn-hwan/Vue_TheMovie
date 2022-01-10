const path = require('path');

module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/theMovie/' : '/',
  outputDir: './docs',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_styles.scss"
        ;`,
      },
    }
  },
}