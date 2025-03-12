<script setup lang="ts">
import type { Fruit } from "~/types";
onUpdated(() => console.log("first"));

defineProps<{ fruit: Fruit }>();
</script>

<template>
  <div class="fruit-card--container">
    <h3>{{ fruit.name }}</h3>

    <p>
      family: <span style="font-weight: bold">{{ fruit.family }}</span>
    </p>

    <ul>
      <li
        v-for="[nutrition, value] in Object.entries(fruit.nutritions)"
        :key="nutrition"
      >
        {{ nutrition }}: <span style="font-weight: bold">{{ value }}</span>
      </li>
    </ul>

    <FruitCardFavoritesButton :fruit-id="fruit.id" />
  </div>
</template>

<style lang="scss" scoped>
.fruit-card--container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: clamp(200px, 100%, 250px);
  height: 200px;
  border: 1px solid rgba(255, 165, 0, 1);
  border-radius: 8px;
  padding: 8px;
  background-color: rgba(255, 165, 0, 0.05);

  h3 {
    font-size: 1.1rem;
    font-weight: bold;
    max-width: 80%;
    text-align: center;
  }

  ul {
    font-size: 0.8rem;
    & > li + li {
      margin-top: 4px;
    }
  }

  &:hover {
    box-shadow: 0px 0px 6px 6px rgba(255, 165, 0, 0.25);
  }
}
</style>
