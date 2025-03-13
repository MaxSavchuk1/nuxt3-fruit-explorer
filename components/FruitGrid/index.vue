<script setup lang="ts">
const { fruits } = storeToRefs(useFruitsStore());
</script>

<template>
  <div class="fruits-grid">
    <FruitGridCard v-for="fruit in fruits" :key="fruit.id" :fruit />
  </div>
</template>

<style lang="scss" scoped>
.fruits-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(1, 1fr);
  place-items: center;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
