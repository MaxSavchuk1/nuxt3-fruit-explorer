import type { ShallowRef } from "vue";
import type { Fruit } from "~/types";

export const useFruitsStore = defineStore(
  "fruits-store",
  () => {
    // optimization: there is no need to make every fruit object reactive, so I used shallowRef
    const fruits: ShallowRef<Fruit[]> = shallowRef([]);
    const favoritesIds: Ref<number[]> = ref([]);

    const favoriteFruits = computed(() =>
      fruits.value.filter((fruit) => favoritesIds.value.includes(fruit.id)),
    );

    const fetchFruits = () =>
      useApi().fruit.getAllFruits({
        onSuccess: (response) => (fruits.value = response),
      });

    const fetchFruitsOnce = () => {
      fruits.value.length ? Promise.resolve(fruits.value) : fetchFruits();
    };

    const addToFavorites = (fruitId: number) => {
      favoritesIds.value.push(fruitId);
    };

    const removeFromFavorites = (fruitId: number) => {
      favoritesIds.value = favoritesIds.value.filter((id) => fruitId !== id);
    };

    const isInFavorites = (fruitId: number) =>
      favoritesIds.value.includes(fruitId);

    return {
      fruits,
      favoritesIds,
      favoriteFruits,

      fetchFruits,
      fetchFruitsOnce,
      addToFavorites,
      removeFromFavorites,
      isInFavorites,
    };
  },
  // using persist plugin for saving favorite fruits
  {
    persist: {
      storage: localStorage,
      pick: ["favoritesIds"],
    },
  },
);
