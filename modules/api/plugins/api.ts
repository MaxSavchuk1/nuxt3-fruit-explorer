import { defineNuxtPlugin } from "nuxt/app";
import api from "../modules";

export default defineNuxtPlugin((_) => {
  return {
    provide: {
      api,
    },
  };
});
