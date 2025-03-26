export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  modules: [
    '@pinia/nuxt',
    'nuxt-rating',
    '@nuxtjs/eslint-module',
    '@nuxt/image',
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
    '@unlok-co/nuxt-stripe'
    
  ],

  pinia: {
    storesDirs: ['./data/**']
  },

  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: true
    }
  },

  eslint: {
    fix: true
  },

  stripe: {
    // Server
    server: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {
        // your api options override for stripe server side
        // https://github.com/stripe/stripe-node?tab=readme-ov-file#configuration
      }
      // CLIENT
    },
    client: {
      key: process.env.STRIPE_PUBLIC_KEY,
      // manualClientLoad: true, // if you want to have control where you are going to load the client
      // your api options override for stripe client side https://stripe.com/docs/js/initializing#init_stripe_js-options
      options: {}
    }
  },

  runtimeConfig: {
    mariadb: {
      host:
        process.env.db_host ??
        (() => {
          throw new Error('db_host is undefined')
        })(),
      user:
        process.env.db_user ??
        (() => {
          throw new Error('db_user is undefined')
        })(),
      password:
        process.env.db_pwd ??
        (() => {
          throw new Error('db_pwd is undefined')
        })(),
      port:
        process.env.MYSQLPORT ??
        (() => {
          throw new Error('MYSQLPORT is undefined')
        })()
    },
    mail: {

      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'luky.pospa04@gmail.com',
        pass: 'gmuo irzh ydlq jmah '
      },
      tls: {
        ciphers: 'SSLv3'
      }
    }
  }
  
})