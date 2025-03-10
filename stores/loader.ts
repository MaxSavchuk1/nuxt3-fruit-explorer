export const useLoaderStore = defineStore("loader-store", () => {
  const loader = ref(0);
  const show = () => {
    loader.value++;
  };
  const hide = () => {
    if (loader.value > 0) loader.value--;
  };
  const isLoading = computed(() => !!loader.value);

  return {
    isLoading,
    show,
    hide,
  };
});
