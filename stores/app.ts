export const useAppStore = defineStore("app-store", () => {
  const baseURL = ref(useRuntimeConfig().public.apiBase as string);
  return {
    baseURL,
  };
});
