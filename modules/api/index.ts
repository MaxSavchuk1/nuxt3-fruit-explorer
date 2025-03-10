import { fileURLToPath } from "node:url";
import path from "path";
import { defineNuxtModule, addPlugin } from "@nuxt/kit";
import type { Nuxt } from "nuxt/schema";
import { resolve } from "pathe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineNuxtModule({
  meta: {
    name: "api-module",
    configKey: "api-module",
    compatibility: {
      nuxt: "^3.8.0",
    },
  },
  setup(_: any, nuxt: Nuxt) {
    addPlugin(resolve(__dirname, "./plugins/api.ts"));
    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(__dirname, "./utils"));
    });
  },
});
