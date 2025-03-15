export const useAppStore = defineStore("app-store", () => {
  const baseURL = computed(() => useRuntimeConfig().public.apiBase as string);
  const navLinks = computed(() => [
    { name: "Home", path: "/" },
    { name: "Favorites", path: "/favorites" },
  ]);

  return {
    baseURL,
    navLinks,
  };
});
