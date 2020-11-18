import colors from 'vuetify/es5/util/colors'
const axios = require('axios')

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Truyền hình 24h',
    htmlAttrs: {
      lang: 'vi'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Cập nhật lịch phát sóng truyền hình và tổng hợp các chương trình truyền hình nhanh, chính xác và đầy đủ nhất'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: 'https://apis.google.com/js/api.js' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/index.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/mixins',
    '@/plugins/filters',
    { src: '@/plugins/gg-calendar', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/dotenv'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    routes: async() => {
      console.log('start')
      const data = await axios.post('https://truyenhinh24h-backend.herokuapp.com/rest/v1/channels/get-all', { page: 1, limit: 999999 })
      console.log(data)
      return data.map((channel) => `/lich-phat-song/${channel.name}_${channel.id}`)
    },
    path: '/sitemap.xml',
    gzip: true,
    generate: false
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
