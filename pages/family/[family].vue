<script setup lang="ts">
const { family } = useRoute().params;
const { data } = useLazyAsyncData(`${family}`, () =>
  useApi().fruit.getFruitsByFamily(family as string),
);
</script>

<template>
  <div class="container family-page">
    <h1>{{ family }}</h1>

    <FruitGrid :fruits="data" />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/variables" as *;

.family-page {
  h1 {
    text-align: center;
    margin-bottom: 24px;
    font-weight: 600;
    font-size: $fs-3xl;
  }
}
</style>
