// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "nuxt-lodash",
    "@vueuse/nuxt",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
      },
    ],
  ],
  css: ["~/assets/styles/main.scss"],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "",
    },
  },
  nitro: {
    routeRules: {
      // used to remove CORS error
      "/api/**": {
        proxy: `${process.env.NUXT_PUBLIC_API_BASE}/api/**`,
      },
    },
  },
});
