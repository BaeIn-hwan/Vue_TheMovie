module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
			scss: {
				prependData: `
          @import "@/assets/scss/_styles.scss";
          @import "@/assets/scss/font.scss";
        `, 
			}
    }
  },
}