// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@pinia/nuxt",
    "nuxt-rating",
    "@nuxtjs/eslint-module",
    "@nuxt/image",
    "@nuxt/ui",
    "@sidebase/nuxt-auth",
  ],
  pinia: {
    storesDirs: ["./data/**"],
  },
  auth: {
    isEnabled: true,
    provider: {
      type: "authjs",
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },
  eslint: {
    fix: true,
  },
  runtimeConfig: {
    mariadb: {
      host:
        process.env.db_host ??
        (() => {
          throw new Error("db_host is undefined");
        })(),
      user:
        process.env.db_user ??
        (() => {
          throw new Error("db_user is undefined");
        })(),
      password:
        process.env.db_pwd ??
        (() => {
          throw new Error("db_pwd is undefined");
        })(),
      port:
        process.env.MYSQLPORT ??
        (() => {
          throw new Error("MYSQLPORT is undefined");
        })(),
    },
    mail: {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "lemmensmano@gmail.com",
        pass: "***",
      },
      tls: {
        ciphers: "SSLv3",
      },
    },
  },
});
