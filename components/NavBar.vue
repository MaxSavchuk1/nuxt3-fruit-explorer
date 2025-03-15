<script setup lang="ts">
const { navLinks } = useAppStore();
const isCurrentPage = (path: string) => useRoute().path === path;
</script>

<template>
  <nav class="navbar">
    <div class="container navbar-links">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        :class="{ underline: isCurrentPage(link.path) }"
      >
        {{ link.name }}
      </NuxtLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/variables" as *;

.navbar {
  background-color: $c-primary-light;
  margin-bottom: 24px;
}

.navbar-links {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 24px 0;

  a {
    color: $c-primary-dark;
    font-weight: bold;
  }
}
</style>
