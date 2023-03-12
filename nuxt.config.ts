// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    "nuxt-lodash"
  ],
  typescript: {
    strict: true
  },
  build: {
    transpile: ['trpc-nuxt']
  }
})
