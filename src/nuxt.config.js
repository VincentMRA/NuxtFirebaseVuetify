import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // serverMiddleware:[
  //   "~/api/index.js"
  // ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Router
  */
  // router:{
  //   // middleware:["authenticated"]
  // },

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/firebase',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],


  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#0099ff",
          accent: "#717171",
          secondary: "#CC3300",
          info: "#808080",
          warning: "#003366",
          error: "#FF3333",
          success: "#00CC33"
        }
      }
    }
  },



  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */

  axios: {
  },
  /*
  FIREBASE CONFIG
  */
  firebase:{
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL:process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId:process.env.APP_ID
    },
    onFirebaseHosting: true,
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedMutation: "users/SET_LOGGED",
          onAuthStateChangedAction: "users/getUserInfo",
        },
        ssr : {
          credential: '~/serviceAccount.json'
        }
        // ssr: {
        //   // !! NEVER deploy a service account file to github or to a publicly accessible folder on your server !!
        //   credential: '~/assets/firebase/serviceAccount.json',
        //   // Experimental Feature, use with caution.
        //   serverLogin: {
        //     // sessionLifetime: 60 * 60 * 1000 // one hour
        //   }
        // }
      },
      realtimeDb: true,
      functions: {
        location: 'us-central1', // Default
        emulatorPort: 5001
      }
    }
  },

  /*
  ** Build configuration
  */
  buildDir:'.nuxt',
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
