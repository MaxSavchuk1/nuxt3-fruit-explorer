export default defineNuxtRouteMiddleware(() => {
  // if (import.meta.client) {
  useFruitsStore().fetchFruitsOnce();
  // }
});
