import colors from 'vuetify/es5/util/colors'

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
    { src: '@/plugins/gg-calendar', mode: 'client' },
    { src: '~plugins/ga.js', mode: 'client' }
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
  },
  sitemap: {
    // routes: [
    //   '/lich-phat-song/HBO_1'
    // ]
  //   routes: async() => {
  //     console.log('start')
  //     const data = await axios.post('https://truyenhinh24h-backend.herokuapp.com/rest/v1/channels/get-all', { page: 1, limit: 999999 })
  //     console.log(data)
  //     return data.map((channel) => `/lich-phat-song/${channel.name}_${channel.id}`)
  //   },
  //   path: '/sitemap.xml',
  //   gzip: true,
  //   generate: false
    hostname: 'https://truyenhinh24h.live',
    path: '/sitemap.xml',
    gzip: true,
    exclude: [

    ],
    defaults: {
      changefreq: 'monthly',
      priority: 1,
      lastmod: new Date()
    },
    routes: [
      '/lich-phat-song/HBO_1',
      'lich-phat-song/FOX-MOVIES_2',
      'lich-phat-song/CINEMAX_3',
      'lich-phat-song/AXN_4',
      'lich-phat-song/DISCOVERY-ASIA_5',
      'lich-phat-song/DISCOVERY_6',
      'lich-phat-song/VTV1_11',
      'lich-phat-song/VTV3_12',
      'lich-phat-song/VTV6_13',
      'lich-phat-song/VTV2_18',
      'lich-phat-song/VTV4_19',
      'lich-phat-song/THVL1_14',
      'lich-phat-song/THVL2_15',
      'lich-phat-song/THVL3_16',
      'lich-phat-song/THVL4_17',
      'lich-phat-song/TodayTV_20',
      'lich-phat-song/HTV7_21',
      'lich-phat-song/HTV9_22'

    ]
  }
}
