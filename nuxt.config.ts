// https://nuxt.com/docs/api/configuration/nuxt-config
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
    '@sidebase/nuxt-auth'
  ],
  eslint: {
    fix: true
  }
})
