<script setup lang="ts">
const { favoriteFruits } = storeToRefs(useFruitsStore());
</script>

<template>
  <div class="container">
    <FruitGrid v-if="favoriteFruits.length" :fruits="favoriteFruits" />
    <p v-else>No favorite fruits</p>
  </div>
</template>

<style lang="scss" scoped></style>
