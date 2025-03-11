<script setup lang="ts"></script>

<template>
  <div class="not-found">
    <h2>404</h2>
    <span>Page doesn't exist</span>
    <router-link to="/">Go Home</router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  h2 {
    font-size: 100px;
  }
}
</style>
