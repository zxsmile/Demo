var webpack = require('webpack');
const path = require('path');
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {
        src: 'http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js'
      }
    ]
  },
  plugins: [
    {
      src: '~plugins/nuxt-quill-plugin.js',
      ssr: false // 仅在客户端渲染
    },
    '~plugins/element-ui'
  ],
  /*
** Global CSS
*/
  css: [
    {
      src: 'static/stylus/base.styl',
      lang: 'stylus?indentedSyntax=true'
    },
    '~/static/css/main.css',
    '~/static/css/iconfont.css',
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},
  /*
   ** Build configuration
   */
  build: {
    vendor: ['axios',
      'element-ui',
      'vue-quill-editor'
    ],
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ],
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        // 配置别名
        config.resolve.alias['@'] = path.resolve(__dirname, './');
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
