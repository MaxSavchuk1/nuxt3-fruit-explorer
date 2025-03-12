<script setup lang="ts">
const { fruitId } = defineProps<{ fruitId: number }>();

const { addToFavorites, removeFromFavorites, isInFavorites } = useFruitsStore();

const favoritesHandler = () =>
  isInFavorites(fruitId)
    ? removeFromFavorites(fruitId)
    : addToFavorites(fruitId);
</script>

<template>
  <div class="favorites-button" @click="favoritesHandler">
    <i
      :class="isInFavorites(fruitId) ? 'ri-heart-fill' : 'ri-heart-line'"
      style="color: red"
    ></i>
  </div>
</template>

<style lang="scss" scoped>
.favorites-button {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
