<script setup lang="ts">
const { fruits } = storeToRefs(useFruitsStore());
</script>

<template>
  <div class="container">
    <div></div>

    <FruitGrid :fruits />
  </div>
</template>

<style lang="scss" scoped></style>
