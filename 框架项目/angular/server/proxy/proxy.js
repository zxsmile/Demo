module.exports = {
  '/factual': {
    target: 'https://ent-test.icekredit.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/factual': '/factual'
    }
  },
  '/config': {
    target: 'https://ent-test.icekredit.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/config': '/config'
    }
  }
}
