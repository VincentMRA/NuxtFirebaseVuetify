import colors from 'vuetify/es5/util/colors'

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
    '@nuxtjs/vuetify'
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
      apiKey: "AIzaSyALMtZF3WopNjQ-EwaZDKbxDq5Je1fwvXc",
      authDomain: "mra-vue.firebaseapp.com",
      databaseURL: "https://mra-vue.firebaseio.com",
      projectId: "mra-vue",
      storageBucket: "mra-vue.appspot.com",
      messagingSenderId: "606160825857",
      appId: "1:606160825857:web:9e51bfed7565b25b06da00"
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
          credential: '~/assets/serviceAccount.json'
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
  ** Build configuration
  */
  buildDir:'../functions/nuxt',
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
