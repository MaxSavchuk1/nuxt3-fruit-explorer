<script setup lang="ts">
import type { Fruit } from "~/types";

defineProps<{ fruit: Fruit }>();
</script>

<template>
  <div class="fruit-card--container">
    <h3>{{ fruit.name }}</h3>

    <p>
      family:
      <NuxtLink :to="`/family/${fruit.family}`" class="underline">
        {{ fruit.family }}
      </NuxtLink>
    </p>

    <ul>
      <li
        v-for="[nutrition, value] in Object.entries(fruit.nutritions)"
        :key="nutrition"
      >
        {{ nutrition }}: <span style="font-weight: bold">{{ value }}</span>
      </li>
    </ul>

    <FruitGridFavoritesButton :fruit-id="fruit.id" />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/variables" as *;

.fruit-card--container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: clamp(200px, 100%, 250px);
  height: 200px;
  border: 1px solid $c-primary;
  border-radius: 8px;
  padding: 8px;
  background-color: $c-primary-extralight;

  h3 {
    font-size: $fs-lg;
    font-weight: bold;
    max-width: 80%;
    text-align: center;
  }

  ul {
    font-size: $fs-xs;
    & > li + li {
      margin-top: 4px;
    }
  }

  a {
    font-weight: bold;
    color: $c-primary-dark;
  }

  &:hover {
    box-shadow: 0px 0px 6px 6px $c-primary-light;
  }
}
</style>
