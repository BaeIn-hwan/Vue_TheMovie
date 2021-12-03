const path = require('path');

module.exports = {
  lintOnSave: false,
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