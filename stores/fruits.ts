import type { Fruit } from "~/types";

export const useFruitsStore = defineStore("fruits-store", () => {
  const fruits: Ref<Fruit[]> = ref([]);
  const favorites: Ref<number[]> = ref([]);

  const fetchFruits = () =>
    useApi().fruit.getAllFruits({
      onSuccess: (response) => (fruits.value = response),
    });

  const fetchFruitsOnce = () => {
    fruits.value.length ? Promise.resolve(fruits.value) : fetchFruits();
  };

  const addToFavorites = (fruitId: number) => {
    favorites.value.push(fruitId);
  };

  const removeFromFavorites = (fruitId: number) => {
    favorites.value = favorites.value.filter((id) => fruitId !== id);
  };

  const isInFavorites = (fruitId: number) => favorites.value.includes(fruitId);

  return {
    fruits,
    favorites,

    fetchFruits,
    fetchFruitsOnce,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
  };
});
